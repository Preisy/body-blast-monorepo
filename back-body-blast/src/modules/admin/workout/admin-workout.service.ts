import { Injectable } from '@nestjs/common';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { CreateWorkoutByAdminRequest } from './dto/admin-create-wrokout.dto';
import { UpdateWorkoutByAdminRequest } from './dto/admin-update-workout.dto';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Injectable()
export class AdminWorkoutService {
  constructor(private readonly baseService: BaseWorkoutService) {}

  async create(request: CreateWorkoutByAdminRequest): Promise<AppSingleResponse<WorkoutEntity>> {
    return this.baseService.create(request);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<WorkoutEntity>> {
    return this.baseService.findAll(query);
  }

  async findAllByDate(query: AppDatePagination.Request): Promise<AppDatePagination.Response<WorkoutEntity>> {
    return this.baseService.findAllByDate(query);
  }

  async findOne(id: WorkoutEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: WorkoutEntity['id'], request: UpdateWorkoutByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: WorkoutEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
