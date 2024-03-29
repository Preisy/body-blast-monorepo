import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { AdminWorkoutService } from './admin-workout.service';
import { CreateWorkoutByAdminRequest } from './dto/admin-create-wrokout.dto';
import { GetWorkoutByAdminDTO, GetWorkoutForUserByAdminRequest } from './dto/admin-get-workout.dto';
import { UpdateWorkoutByAdminRequest } from './dto/admin-update-workout.dto';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Controller('admin/workouts')
@ApiTags('Admin workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminWorkoutController {
  constructor(private readonly adminService: AdminWorkoutService) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateWorkoutByAdminRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get('date')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Query() query: GetWorkoutForUserByAdminRequest) {
    return await this.adminService.findAllByDate(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetWorkoutByAdminDTO) })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateWorkoutByAdminRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.adminService.deleteOne(id);
  }
}
