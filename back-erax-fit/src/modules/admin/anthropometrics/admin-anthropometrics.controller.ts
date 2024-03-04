import { Controller, UseFilters, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Get, Query, Param } from '@nestjs/common/decorators';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from './admin-anthropometrics.service';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { GetAnthropometricsForUserByAdminRequest } from './dto/get-anthropometrics-for-user-by-admin.dto';

@Controller('admin/anthropometrics')
@ApiTags('Admin anthropometrics')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAnthropometricsController {
  constructor(private readonly adminService: AdminAnthropometricsService) {}
  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Query() query: GetAnthropometricsForUserByAdminRequest) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }
}
