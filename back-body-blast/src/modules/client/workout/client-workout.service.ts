import { Injectable } from '@nestjs/common';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { UpdateWorkoutByClientRequest } from './dto/client-update-workout.dto';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Injectable()
export class ClientWorkoutService {
  constructor(private readonly baseService: BaseWorkoutService) {}

  async findAll(
    userId: WorkoutEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<WorkoutEntity>> {
    return this.baseService.findAll(query, {
      where: {
        userId,
      },
    });
  }

  async findAllByDate(
    userId: WorkoutEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<WorkoutEntity>> {
    return this.baseService.findAllByDate(query, {
      where: {
        userId,
      },
    });
  }

  async update(id: WorkoutEntity['id'], request: UpdateWorkoutByClientRequest) {
    return this.baseService.update(id, request);
  }
}
