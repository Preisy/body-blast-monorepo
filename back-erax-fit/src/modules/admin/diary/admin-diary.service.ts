import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/constants/constants';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { BaseUserService } from 'src/modules/core/user/base-user.service';
import { BaseWorkoutService } from 'src/modules/core/workout/base-workout.service';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { Repository } from 'typeorm';
import { GetStepsByUserIdByAdminDTO } from './dto/admin-get-steps-by-userId.dto';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { BaseDiaryService } from 'src/modules/core/diary/base-diary.service';
import { DiaryPropsEntity } from 'src/modules/core/diary/diary-props/entity/diary-props.entity';
import { CreateDiaryByAdminRequest } from './dto/admin-create-diary.dto';
import { UpdateDiaryByAdminRequest } from './dto/admin-update-diary.dto';

@Injectable()
export class AdminDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    private readonly baseService: BaseDiaryService,
    private readonly workoutService: BaseWorkoutService,
    private readonly diaryTemplateService: BaseDiaryTemplateService,
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  // async createSelfControlCron() {
  //   const { data: users } = await this.userService.getUsers(new AppDatePagination.Request(), {
  //     where: {
  //       role: UserRole.Client,
  //     },
  //   });

  //   users.forEach(async (user) => {
  //     const newDiary = this.diaryRepository.create({
  //       userId: user.id,
  //     });
  //     const { data: template } = await this.diaryTemplateService.findOne(user.templateId);
  //     newDiary.props = new Array<DiaryPropsEntity>();
  //     template.props.forEach((prop) => {
  //       const newProp = new DiaryPropsEntity();
  //       newProp.label = prop.label;
  //       newDiary.props.push(newProp);
  //     });
  //     const newDate = new Date(Date.now());
  //     newDate.setHours(0, 0, 0, 0);
  //     newDiary.date = newDate;
  //     try {
  //       const { data: workout } = await this.workoutService.findOneByDate(newDate);
  //       newDiary.behaviour = `Цикл ${workout.loop}`;
  //     } catch (e) {
  //       newDiary.behaviour = 'Отдых';
  //     }
  //     await this.diaryRepository.save(newDiary);
  //   });
  // }

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
