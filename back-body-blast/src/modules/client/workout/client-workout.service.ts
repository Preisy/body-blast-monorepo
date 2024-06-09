import { Injectable } from '@nestjs/common';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { UpdateWorkoutByClientRequest } from './dto/client-update-workout.dto';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { MainException } from '../../../exceptions/main.exception';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Injectable()
export class ClientWorkoutService {
  constructor(private readonly baseService: BaseWorkoutService) {}

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<WorkoutEntity>> {
    return this.baseService.findAll(query);
  }

  async findAllByDate(query: AppDatePagination.Request): Promise<AppDatePagination.Response<WorkoutEntity>> {
    return this.baseService.findAllByDate(query);
  }

  async update(userId: UserEntity['id'], id: WorkoutEntity['id'], request: UpdateWorkoutByClientRequest) {
    const { data: workout } = await this.baseService.findOne(id);
    if (workout.userId != userId)
      throw MainException.forbidden(`Workout with id ${id} is not for user with id ${userId}`);
    return this.baseService.update(id, request);
  }
}
