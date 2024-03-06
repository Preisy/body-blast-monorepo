import { Body, Controller, Post, Req, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { AuthRequest, AuthResponse, LoginRequest } from './dto/auth.dto';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { ValidationPipe } from '../../pipes/validation.pipe';
import { RequestWithUser } from './types/requestWithUser.type';
import { AppAuthGuard } from './guards/appAuth.guard';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../dto/app-status-response.dto';
import { AuthService } from './auth.service';
import { UpdateRefreshAccess } from './dto/update-token.dto';
import { AppLoggerInterceptor } from '../../interceptors/app-logger.interceptor';

@Controller('auth')
@ApiTags('Authentication')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@UseInterceptors(AppLoggerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}
  @Throttle(5, 1)
  @Post('signup')
  @AppResponses({ status: 201, type: AppSingleResponse.type(AuthResponse) })
  async auth(@Body() req: AuthRequest) {
    return this.authService.auth(req);
  }

  @Throttle(5, 1)
  @Post('login')
  @AppResponses({ status: 200, type: AppSingleResponse.type(LoginRequest) })
  async login(@Body() req: LoginRequest) {
    return this.authService.login(req);
  }

  @AppAuthGuard()
  @Throttle(5, 1)
  @Post('logout')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req.user.email);
  }

  @Throttle(5, 1)
  @Post('refresh')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AuthResponse) })
  async refreshTokens(@Body() body: UpdateRefreshAccess) {
    return this.authService.refreshTokens(body.accessToken, body.refreshToken);
  }
}
