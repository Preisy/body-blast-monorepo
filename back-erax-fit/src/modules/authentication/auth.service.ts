import { Injectable, Inject } from '@nestjs/common';
import { AuthRequest, AuthResponse, LoginRequest } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MainException } from '../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../core/user/entities/user.entity';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { UpdateUserResponse } from '../core/user/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from '../../constants/constants';
import { AppStatusResponse } from '../../dto/app-status-response.dto';
import { BaseUserService } from '../core/user/base-user.service';
import { UpdateTokenRequest } from './dto/update-token.dto';
import { AppSingleResponse } from '../../dto/app-single-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(BaseUserService)
    private readonly baseService: BaseUserService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  async auth(request: AuthRequest): Promise<AuthResponse> {
    const { data: newUser } = await this.baseService.create(request);

    if (!(await bcrypt.compare(request.password, newUser.password))) {
      throw MainException.unauthorized();
    }

    await this.createTokenForUser(newUser.email);

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshHash(newUser.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    const { data: user } = await this.baseService.getUserByEmail(request.email.toLowerCase());
    const passwordMatches = await bcrypt.compare(request.password, user.password);
    if (!passwordMatches) throw MainException.forbidden(`Error: no password mathces for user with id ${user.id}`);

    if (!user.token || !user.tokenId) await this.createTokenForUser(user.email);

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRefreshHash(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  async provideUser(jwt: string) {
    try {
      const options = {
        secret: process.env.JWT_SECRET,
        publicKey: process.env.JWT_PUBLIC_KEY,
      };

      const decodedToken = await this.jwtService.verifyAsync(jwt, options);
      if (!decodedToken || !decodedToken?.email) throw MainException.invalidData('Invalid token provided');

      return (await this.getUserByEmailWithToken(decodedToken.email)).data;
    } catch {
      throw MainException.forbidden('Access denied: no jwt found');
    }
  }

  async logout(email: string): Promise<AppStatusResponse> {
    const { data: user } = await this.getUserByEmailWithToken(email.toLowerCase());
    const { affected } = await this.tokenRepository.delete(user.tokenId!);
    return new AppStatusResponse(!!affected);
  }

  async getTokens(userId: UserEntity['id'], email: string): Promise<AuthResponse> {
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

  async refreshTokens(access: string, refresh: string): Promise<AuthResponse> {
    const refreshToken = await this.jwtService.verifyAsync(refresh, {
      secret: process.env.JWT_REFRESH_SECRET,
      publicKey: process.env.JWT_PUBLIC_KEY,
    });
    if (!refreshToken || !refreshToken?.email) throw MainException.invalidData('Invalid token provided');

    const { data: user } = await this.getUserByEmailWithToken(refreshToken.email);

    const refreshMatches = await bcrypt.compare(refresh, user.token!.refreshHash);
    const accessMatches = await bcrypt.compare(access, user.token!.hash);

    if (!refreshMatches || !accessMatches)
      throw MainException.forbidden(`Failed to refresh access: current tokens for user ${user.id} don't match`);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshHash(user.id, tokens.accessToken, tokens.refreshToken);

    return tokens;
  }

  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async updateRefreshHash(userId: UserEntity['id'], access: string, refresh: string) {
    const { data: user } = await this.getUserByIdWithToken(userId);

    user.token!.refreshHash = await this.hashData(access);
    user.token!.hash = await this.hashData(refresh);

    await this.updateTokenHash(user);
  }

  private async createTokenForUser(email: string) {
    const { data: user } = await this.baseService.getUserByEmail(email);
    const newToken = this.tokenRepository.create({
      hash: 'default',
      refreshHash: 'default',
    });

    user.token = newToken;
    user.tokenId = newToken.id;
    await this.tokenRepository.save(newToken);

    await this.userRepository.save(user);
  }

  private async getUserByIdWithToken(id: UserEntity['id'], role?: UserRole): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
        role: role,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with id ${id} not found`);
    const token = await this.tokenRepository.findOne({
      where: {
        id: user.tokenId,
      },
    });

    if (!token) throw MainException.entityNotFound(`Token for user with id ${id} not found`);

    return new AppSingleResponse(user);
  }

  private async getUserByEmailWithToken(email: string): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with email ${email} not found`);
    const token = await this.tokenRepository.findOne({
      where: {
        id: user.tokenId,
      },
    });

    if (!token) throw MainException.entityNotFound(`Token for user with email ${email} not found`);

    return new AppSingleResponse(user);
  }

  private async updateTokenHash(request: UpdateTokenRequest): Promise<UpdateUserResponse> {
    const { data: user } = await this.getUserByIdWithToken(request.id);

    if (request.token) {
      user.token!.hash = request.token.hash;
      user.token!.refreshHash = request.token.refreshHash;
    }

    await this.tokenRepository.save(request.token!);
    const savedUser = await this.userRepository.save(user);
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new UpdateUserResponse(savedUser);
  }
}
