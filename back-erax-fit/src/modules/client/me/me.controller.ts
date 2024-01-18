import { Body, Controller, Get, Patch, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { MeService } from './me.service';
import { UpdateUserByClientRequest } from './dto/update-client-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { UserEntity } from '../../core/user/entities/user.entity';

@AppAuthGuard()
@Controller('me')
@ApiTags('Me')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async getMe(@Req() req: RequestWithUser) {
    return await this.meService.getMe(req.user.id);
  }

  @Patch()
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async updateUser(@Req() req: RequestWithUser, @Body() body: UpdateUserByClientRequest) {
    return await this.meService.updateUser(req.user.id, body);
  }
}
