import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseAuthGuard } from 'src/modules/authentication/guards/baseAuth.guard';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { AdminSelfControlService } from './admin-self-control.service';
import { CreateSelfControlByAdminRequest } from './dto/admin-create-self-control.dto';
import { GetSelfControlByAdminDTO } from './dto/admin-get-self-control.dto';
import { UpdateSelfControlByAdminRequest } from './dto/admin-update-self-control.dto';

@Controller('admin/self-control')
@ApiTags('Admin self-control')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminSelfControlController {
  constructor(private readonly adminService: AdminSelfControlService) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateSelfControlByAdminRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(SelfControlEntity) })
  async getAll(@Query() query: AppDatePagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetSelfControlByAdminDTO) })
  async getOne(@Param('id') id: number) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdateSelfControlByAdminRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id') id: number) {
    return await this.adminService.deleteOne(id);
  }
}
