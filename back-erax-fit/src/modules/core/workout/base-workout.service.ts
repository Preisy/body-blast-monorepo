import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from './entity/workout.entity';
import { Repository } from 'typeorm';
import { MainException } from '../../../exceptions/main.exception';
import { GetWorkoutDTO } from './dto/get-workout.dto';
import { CreateWorkoutRequest } from './dto/create-workout.dto';
import { UpdateWorkoutRequest } from './dto/update-workout.dto';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';

@Injectable()
export class BaseWorkoutService {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {}
  public readonly relations: (keyof WorkoutEntity)[] = ['exercises', 'user'];

  async create(request: CreateWorkoutRequest): Promise<AppSingleResponse<WorkoutEntity>> {
    const newWorkout = this.workoutRepository.create({
      ...request,
      date: new Date(request.date),
    });

    const savedWorkout = await this.workoutRepository.save(newWorkout);

    return new AppSingleResponse<GetWorkoutDTO>(this.getWorkoutDTO(savedWorkout));
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<WorkoutEntity>,
  ): Promise<AppPagination.Response<WorkoutEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.workoutRepository, this.relations);
    const { data, count } = await getPaginatedData(query, options);
    const newData = data.map((it) => this.getWorkoutDTO(it));
    return new AppPagination.Response(newData, count);
  }

  async findOne(id: WorkoutEntity['id']) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id: id,
      },
      relations: this.relations,
    });

    if (!workout) {
      throw MainException.entityNotFound(`Workout with id: ${id} not found`);
    }
    return new AppSingleResponse<GetWorkoutDTO>(this.getWorkoutDTO(workout));
  }

  async update(id: WorkoutEntity['id'], request: UpdateWorkoutRequest) {
    const { data: workout } = await this.findOne(id);
    if (request.exercises) {
      await this.exerciseRepository.delete({
        workoutId: id,
      });
      workout.exercises = [];
    }
    const savedWorkout = await this.workoutRepository.save({
      ...workout,
      ...filterUndefined(request),
      date: new Date(request.date || workout.date),
    });
    return new AppSingleResponse<GetWorkoutDTO>(this.getWorkoutDTO(savedWorkout));
  }

  async deleteOne(id: WorkoutEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.workoutRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  private getWorkoutDTO(workout: WorkoutEntity) {
    return {
      ...workout,
      localeDate: workout.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    };
  }
}
