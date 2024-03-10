import { Injectable } from '@nestjs/common';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { UpdateWorkoutByClientRequest } from './dto/client-update-workout.dto';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { MainException } from '../../../exceptions/main.exception';

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

  async update(userId: UserEntity['id'], id: WorkoutEntity['id'], request: UpdateWorkoutByClientRequest) {
    const { data: workout } = await this.baseService.findOne(id);
    if (workout.userId != userId)
      throw MainException.forbidden(`Workout with id ${id} is not for user with id ${userId}`);
    return this.baseService.update(id, request);
  }
}
