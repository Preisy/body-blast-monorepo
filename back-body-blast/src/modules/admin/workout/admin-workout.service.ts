import { Injectable } from '@nestjs/common';
import { BaseWorkoutService } from '../../core/workout/base-workout.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { WorkoutEntity } from '../../core/workout/entity/workout.entity';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { CreateWorkoutByAdminRequest } from './dto/admin-create-wrokout.dto';
import { UpdateWorkoutByAdminRequest } from './dto/admin-update-workout.dto';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetWorkoutForUserByAdminRequest } from './dto/admin-get-workout.dto';

@Injectable()
export class AdminWorkoutService {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    private readonly baseService: BaseWorkoutService,
  ) {}
  public readonly relations: (keyof WorkoutEntity)[] = ['exercises', 'user'];

  async create(request: CreateWorkoutByAdminRequest): Promise<AppSingleResponse<WorkoutEntity>> {
    return this.baseService.create(request);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<WorkoutEntity>> {
    return this.baseService.findAll(query);
  }

  async findAllByDate(request: GetWorkoutForUserByAdminRequest): Promise<AppDatePagination.Response<WorkoutEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.workoutRepository, this.relations);

    const query: AppDatePagination.Request = {
      from: request.from,
      to: request.to,
      expanded: request.expanded,
    };
    const { data: workoutRecords, count: count } = await getPaginatedData(query, { where: { userId: request.userId } });

    return new AppDatePagination.Response(workoutRecords, count);
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
