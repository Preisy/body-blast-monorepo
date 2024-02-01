import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { BaseDiaryService } from 'src/modules/core/diary/base-diary.service';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { BaseWorkoutService } from 'src/modules/core/workout/base-workout.service';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { AppPagination } from 'src/utils/app-pagination.util';
import { Repository } from 'typeorm';
import { CreateDiaryByAdminRequest } from './dto/admin-create-diary.dto';
import { GetStepsByUserIdByAdminDTO } from './dto/admin-get-steps-by-userId.dto';
import { UpdateDiaryByAdminRequest } from './dto/admin-update-diary.dto';

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
  async createSelfControlCron() {
    const { data: workouts } = await this.workoutService.findAll(new AppPagination.Request(), {});

    const { data: templates } = await this.diaryTemplateService.findAll(new AppPagination.Request(), {
      relations: ['props'],
    });
    templates.forEach(async (template) => {
      const labels: { label: string }[] = template.props.map(({ label }) => ({ label }));
      const newDiary = this.diaryRepository.create({
        userId: template.userId,
        props: labels,
      });

      const newDate = new Date();
      newDate.setHours(0, 0, 0, 0);
      newDiary.date = newDate;

      const workout = workouts.find((workout) => workout.id == template.userId);
      if (workout) {
        newDiary.behaviour = `Цикл ${workout.loop}`;
      } else {
        newDiary.behaviour = 'Отдых';
      }
      await this.diaryRepository.save(newDiary);
    });
  }

  async create(request: CreateDiaryByAdminRequest): Promise<AppSingleResponse<DiaryEntity>> {
    return this.baseService.create(request);
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

  async deleteOne(id: DiaryEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
