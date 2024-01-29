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
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { AdminDiaryService } from './admin-diary.service';
import { CreateDiaryByAdminRequest } from './dto/admin-create-diary.dto';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { GetDiaryByAdminDTO } from './dto/admin-get-diary.dto';
import { UpdateDiaryByAdminRequest } from './dto/admin-update-diary.dto';

@Controller('admin/diary')
@ApiTags('Admin diary')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminDiaryController {
  constructor(private readonly adminService: AdminDiaryService) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateDiaryByAdminRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(DiaryEntity) })
  async getAll(@Query() query: AppDatePagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetDiaryByAdminDTO) })
  async getOne(@Param('id') id: number) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdateDiaryByAdminRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id') id: number) {
    return await this.adminService.deleteOne(id);
  }
}
