import {
  Controller,
  Post,
  Get,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Param,
  Query,
  ParseIntPipe,
  Delete,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { AdminBonusVideoService } from './admin-bonus-video.service';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { CreateVideoByAdminRequest } from './dto/admin-create-video.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';

@Controller('admin/bonus-video')
@ApiTags('Admin bonus video')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminBonusVideoController {
  constructor(private readonly adminService: AdminBonusVideoService) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(BonusVideoEntity) })
  async create(@Body() body: CreateVideoByAdminRequest) {
    return await this.adminService.create(body);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(BonusVideoEntity) })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(BonusVideoEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.delete(id);
  }
}
