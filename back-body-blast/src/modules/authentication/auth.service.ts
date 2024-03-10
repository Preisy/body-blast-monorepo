import { Injectable } from '@nestjs/common';
import { AuthRequest, AuthResponse, LoginRequest } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MainException } from '../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../core/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AppStatusResponse } from '../../dto/app-status-response.dto';
import { BaseUserService } from '../core/user/base-user.service';
import { UpdateRefreshAccess } from './dto/update-token.dto';
import { AppSingleResponse } from '../../dto/app-single-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly baseService: BaseUserService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async signUp(request: AuthRequest): Promise<AppSingleResponse<UserEntity>> {
    return this.baseService.create(request);
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const { data: user } = await this.baseService.getUserByEmail(request.email.toLowerCase());
    const passwordMatches = await bcrypt.compare(request.password, user.password);
    if (!passwordMatches) throw MainException.forbidden(`Error: no password mathces for user with id ${user.id}`);

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshHash(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async refreshTokens(request: UpdateRefreshAccess): Promise<AuthResponse> {
    const refreshToken = await this.jwtService.verifyAsync(request.refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
      publicKey: process.env.JWT_PUBLIC_KEY,
    });
    if (!refreshToken || !refreshToken?.email) throw MainException.invalidData('Invalid token provided');

    const { data: token } = await this.getTokenByUserEmail(refreshToken.email);

    const refreshMatches = await bcrypt.compare(request.refreshToken, token!.refreshHash);
    const accessMatches = await bcrypt.compare(request.accessToken, token!.hash);

    const { data: user } = await this.baseService.getUserByEmail(refreshToken.email);

    if (!refreshMatches || !accessMatches)
      throw MainException.forbidden(`Failed to refresh access: current tokens for user ${user.id} don't match`);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async logout(email: string): Promise<AppStatusResponse> {
    const { data: token } = await this.getTokenByUserEmail(email.toLowerCase());
    const { data: user } = await this.baseService.getUserByEmail(email);
    if (!token || token.refreshHash == null || token.hash == null)
      throw MainException.unauthorized(`Unauthorized user with id ${user.id}`);
    const { affected } = await this.tokenRepository.delete(token.id!);
    return new AppStatusResponse(!!affected);
  }

  async provideUser(jwt: string) {
    try {
      const options = {
        secret: process.env.JWT_SECRET,
        publicKey: process.env.JWT_PUBLIC_KEY,
      };

      const decodedToken = await this.jwtService.verifyAsync(jwt, options);
      if (!decodedToken || !decodedToken?.email) throw MainException.invalidData('Invalid token provided');

      return (await this.baseService.getUserByEmail(decodedToken.email)).data;
    } catch {
      throw MainException.forbidden('Access denied: no jwt found');
    }
  }

  private async getTokens(userId: UserEntity['id'], email: string): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION },
      ),

      this.jwtService.signAsync(
        { sub: userId, email },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRATION },
      ),
    ]);
    return new AuthResponse(accessToken, refreshToken);
  }

  private async getTokenByUserEmail(email: UserEntity['email']) {
    const { data: user } = await this.baseService.getUserByEmail(email);
    const token = await this.tokenRepository.findOne({
      where: {
        userId: user.id,
      },
    });
    if (!token) return this.createTokenForUser(user.email);

    return new AppSingleResponse(token);
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async updateRefreshHash(userId: UserEntity['id'], access: string, refresh: string) {
    const { data: user } = await this.baseService.getUserById(userId);
    const { data: token } = await this.getTokenByUserEmail(user.email);

    token!.refreshHash = await bcrypt.hash(access, 10);
    token!.hash = await bcrypt.hash(refresh, 10);

    const savedTokens = await this.tokenRepository.save(token);
    if (!savedTokens) throw MainException.internalRequestError('Error upon saving token');

    return new AppSingleResponse(savedTokens);
  }

  private async createTokenForUser(email: string) {
    const { data: user } = await this.baseService.getUserByEmail(email);
    const newToken = this.tokenRepository.create({
      hash: 'default',
      refreshHash: 'default',
      user: user,
      userId: user.id,
    });
    const savedToken = await this.tokenRepository.save(newToken);
    return new AppSingleResponse(savedToken);
  }
}
