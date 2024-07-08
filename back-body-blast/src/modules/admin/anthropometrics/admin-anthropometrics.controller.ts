import { Controller, ParseUUIDPipe, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Get, Param, Query, Req } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { Action } from '../../../constants/constants';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { AnthropometricsHook } from '../../../modules/core/anthropometrics/anthropometrics.hook';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';
import { GetAnthropometricsForUserByAdminRequest } from './dto/get-anthropometrics-for-user-by-admin.dto';

@Controller('admin/anthropometrics')
@ApiTags('Admin anthropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAnthropometricsController {
  constructor(
    private readonly adminService: AdminAnthropometricsService,
    private readonly hook: AnthropometricsHook,
  ) {}
  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: GetAnthropometricsForUserByAdminRequest) {
    await this.hook.checkAbility(Action.All, req.user);
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityWithId(Action.All, req.user, id);
    return await this.adminService.findOne(id);
  }
}
