import { Controller, UseFilters, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Get, Query, Param, Req, UseGuards } from '@nestjs/common/decorators';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { GetAnthropometricsForUserByAdminRequest } from './dto/get-anthropometrics-for-user-by-admin.dto';
import { Action } from '../../../modules/ability/ability.factory';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { AbilityGuard } from '../../../modules/authentication/guards/ability.guard';
import { CheckAbilities } from '../../../decorators/ability.decorator';
import { AnthropometricsHook } from '../../../modules/core/anthropometrics/anthropometrics.hook';

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
    await this.hook.checkAbilityInstance(Action.Manage, req.user);
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Manage, subject: AnthropometricsEntity })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityInstance(Action.Manage, req.user, id);
    return await this.adminService.findOne(id);
  }
}
