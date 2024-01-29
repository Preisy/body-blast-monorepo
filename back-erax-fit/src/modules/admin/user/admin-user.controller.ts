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
  ParseIntPipe,
} from '@nestjs/common';
import { AdminUserService } from './admin-user.service';
import { UpdateUserByAdminRequest } from './dto/update-admin-user.dto';
import { CreateUserByAdminRequest } from './dto/create-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { UserRole } from '../../../constants/constants';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { AdminDiaryService } from '../diary/admin-diary.service';
import { GetStepsByUserIdByAdminDTO } from '../diary/dto/admin-get-steps-by-userId.dto';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';

@AppAuthGuard(RoleGuard(UserRole.Admin))
@Controller('admin/users')
@ApiTags('Admin user')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminUserController {
  constructor(
    private readonly adminService: AdminUserService,
    private readonly diaryService: AdminDiaryService,
  ) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserByAdminRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async getUsers(@Query() query: AppPagination.Request) {
    return await this.adminService.getUsers(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserByAdminRequest) {
    return await this.adminService.updateUser(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteUserById(+id);
  }

  @Get(':id/self-controls')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(DiaryEntity) })
  async getSelfControls(@Param('id', ParseIntPipe) id: number, @Query() query: AppDatePagination.Request) {
    return this.diaryService.findAllByUserId(id, query);
  }

  @Get(':id/steps')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetStepsByUserIdByAdminDTO) })
  async getSteps(@Param('id', ParseIntPipe) id: number, @Query() query: AppDatePagination.Request) {
    return this.diaryService.getStepsByUserId(id, query);
  }
}
