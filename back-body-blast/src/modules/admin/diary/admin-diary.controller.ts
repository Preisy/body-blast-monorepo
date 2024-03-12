import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { AdminDiaryService } from './admin-diary.service';
import { GetDiaryByAdminDTO } from './dto/admin-get-diary.dto';
import { UpdateDiaryByAdminRequest } from './dto/admin-update-diary.dto';

@Controller('admin/diary')
@ApiTags('Admin diary')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminDiaryController {
  constructor(private readonly adminService: AdminDiaryService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(DiaryEntity) })
  async getAll(@Query() query: AppDatePagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetDiaryByAdminDTO) })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateDiaryByAdminRequest) {
    return await this.adminService.update(id, body);
  }
}
