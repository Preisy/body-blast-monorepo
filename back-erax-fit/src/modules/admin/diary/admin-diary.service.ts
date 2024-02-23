import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseDiaryTemplateService } from '../../../modules/core/diary-template/base-diary-template.service';
import { BaseDiaryService } from '../../../modules/core/diary/base-diary.service';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { BaseWorkoutService } from '../../../modules/core/workout/base-workout.service';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AppPagination } from '../../../utils/app-pagination.util';
import { Repository } from 'typeorm';
import { GetStepsByUserIdByAdminDTO } from './dto/admin-get-steps-by-userId.dto';
import { UpdateDiaryByAdminRequest } from './dto/admin-update-diary.dto';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';

@Injectable()
export class AdminDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    private readonly baseService: BaseDiaryService,
    private readonly workoutService: BaseWorkoutService,
    private readonly diaryTemplateService: BaseDiaryTemplateService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createDiaryCron() {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);

    const { data: workouts } = await this.workoutService.findAll(new AppPagination.Request(), {
      where: {
        date: newDate,
      },
    });
    const workoutsToUserId = workouts.reduce(
      (acc, it) => ({ ...acc, [it.userId]: it }),
      {} as Record<number, WorkoutEntity>,
    );
    const { data: templates } = await this.diaryTemplateService.findAll(new AppPagination.Request(), {
      relations: ['props'],
    });
    const promises = templates.map(async (template) => {
      const labels: { label: string }[] = template.props.map(({ label }) => ({ label }));
      const newDiary = this.diaryRepository.create({
        userId: template.userId,
        props: labels,
      });

      newDiary.date = newDate;

      const workout = workoutsToUserId[template.userId!];
      newDiary.cycle = workout ? workout.cycle : undefined;
      return newDiary;
    });
    const diaries = await Promise.all(promises);
    await this.diaryRepository.save(diaries, { chunk: 10000 });
  }

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<DiaryEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: DiaryEntity['id']) {
    return this.baseService.findOne(id);
  }

  async findAllByUserId(
    userId: DiaryEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<DiaryEntity>> {
    return this.baseService.findAllByUserId(userId, query);
  }

  async getStepsByUserId(
    userId: DiaryEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<GetStepsByUserIdByAdminDTO> {
    return this.baseService.getStepsByUserId(userId, query);
  }

  async update(id: DiaryEntity['id'], request: UpdateDiaryByAdminRequest) {
    return this.baseService.update(id, request);
  }
}
