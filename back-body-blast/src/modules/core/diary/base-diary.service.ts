import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { MainException } from '../../../exceptions/main.exception';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { BaseUserService } from '../user/base-user.service';
import { GetDiaryDTO } from './dto/get-diary.dto';
import { GetStepsByUserIdDTO, StepsByWeek } from './dto/get-steps.dto';
import { UpdateDiaryRequest } from './dto/update-diary.dto';
import { DiaryPropsEntity } from './entity/diary-props.entity';
import { DiaryEntity } from './entity/diary.entity';
import { UserEntity } from '../user/entities/user.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BaseWorkoutService } from '../workout/base-workout.service';
import { WorkoutEntity } from '../workout/entity/workout.entity';
import { BaseDiaryTemplateService } from '../diary-template/base-diary-template.service';

@Injectable()
export class BaseDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    @InjectRepository(DiaryPropsEntity)
    private readonly diaryPropsRepository: Repository<DiaryPropsEntity>,
    @Inject(forwardRef(() => BaseUserService))
    private readonly userService: BaseUserService,
    private readonly workoutService: BaseWorkoutService,
    private readonly diaryTemplateService: BaseDiaryTemplateService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async createDiaryCron() {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    const { data: workouts } = await this.workoutService.findAll(new AppPagination.Request(), {
      where: {
        date: newDate,
      },
    });
    const workoutsToUserId = workouts.reduce(
      (acc, it) => ({ ...acc, [it.userId]: it }),
      {} as Record<string, WorkoutEntity>,
    );
    const { data: templates } = await this.diaryTemplateService.findAll(new AppPagination.Request(), {
      relations: ['props'],
    });
    const promises = templates.map(async (template) => {
      const labels = template.props.map(({ label }) => ({ label }));
      const newDiary = this.diaryRepository.create({
        userId: template.userId,
        props: labels,
        date: newDate,
      });

      const workout = workoutsToUserId[template.userId!];
      newDiary.cycle = workout ? workout.cycle : undefined;
      return newDiary;
    });
    const diaries = await Promise.all(promises);
    await this.diaryRepository.save(diaries, { chunk: 10000 });
  }

  async createEmptyDiaryRecord(userId: UserEntity['id']) {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);

    const { data: template } = await this.diaryTemplateService.findOneByUserId(userId);
    const labels = template.props.map(({ label }) => ({ label }));

    const defaultDiary = this.diaryRepository.create({
      userId,
      props: labels,
      date: newDate,
    });

    const { data: workouts } = await this.workoutService.findAll(new AppPagination.Request(), {
      where: {
        date: newDate,
      },
    });
    const workoutsToUserId = workouts.reduce(
      (acc, it) => ({ ...acc, [it.userId]: it }),
      {} as Record<string, WorkoutEntity>,
    );

    const workout = workoutsToUserId[template.userId!];
    defaultDiary.cycle = workout ? workout.cycle : undefined;

    await this.diaryRepository.save(defaultDiary);
  }

  async getDiaryNotification(idUser: UserEntity['id']) {
    const latestDiary = await this.diaryRepository.findOne({
      where: {
        userId: idUser,
      },
      order: { createdAt: 'DESC' },
    });
    if (!latestDiary) return false;

    return (
      latestDiary.activity == null ||
      latestDiary.sum == null ||
      latestDiary.steps == null ||
      latestDiary.cycle == null ||
      latestDiary.props[0].label == null ||
      latestDiary.props[1].label == null ||
      latestDiary.props[2].label == null ||
      latestDiary.props[3].label == null
    );
  }

  async findAll(
    query: AppDatePagination.Request,
    options?: AppDatePagination.GetExecutorOptions<DiaryEntity>,
  ): Promise<AppDatePagination.Response<DiaryEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.diaryRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: DiaryEntity['id']) {
    const diary = await this.diaryRepository.findOne({
      where: {
        id,
      },
      relations: this.relations,
    });

    if (!diary) {
      throw MainException.entityNotFound(`Self control with id: ${id} not found`);
    }
    return new AppSingleResponse<GetDiaryDTO>(this.getDiaryDTO(diary));
  }

  async findAllByUserId(
    userId: DiaryEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<DiaryEntity>> {
    return this.findAll(query, {
      where: {
        userId,
      },
    });
  }

  async getStepsByUserId(
    userId: DiaryEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<GetStepsByUserIdDTO> {
    const { data: diaries } = await this.findAllByUserId(userId, query);
    const { data: user } = await this.userService.getUserById(userId);

    const firstDayOfWeek = new Date(query.from!);
    const lastDayOfWeek = new Date(query.from!);

    const firstDayOfMonth = new Date(query.from!);
    const lastDayOfMonth = new Date(query.to!);

    const weeks = Math.floor((lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1) / 7);

    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    let weeksCounter = 0;
    const result: StepsByWeek[] = [];
    while (weeksCounter < weeks) {
      let steps = 0;
      const newWeek = diaries.filter((diary) => diary.date >= firstDayOfWeek && diary.date <= lastDayOfWeek);
      newWeek.forEach((diary) => {
        if (diary.steps) steps += diary.steps;
      });
      const stepsByWeek = new StepsByWeek(
        steps,
        user.stepsGoal,
        firstDayOfWeek.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'numeric',
        }),
        lastDayOfWeek.toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'numeric',
        }),
      );
      result.push(stepsByWeek);
      firstDayOfWeek.setDate(lastDayOfWeek.getDate() + 1);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      weeksCounter++;
    }
    return new GetStepsByUserIdDTO(result);
  }

  async update(id: DiaryEntity['id'], request: UpdateDiaryRequest) {
    const { data: diary } = await this.findOne(id);
    if (request.props) {
      diary.sum = request.props.reduce((acc, it) => acc + it.value, 0);

      await this.diaryPropsRepository.delete({
        diaryId: id,
      });
      diary.props = [];
    }
    const savedDiary = await this.diaryRepository.save({
      ...diary,
      ...filterUndefined(request),
    });
    return new AppSingleResponse<GetDiaryDTO>(this.getDiaryDTO(savedDiary));
  }

  private getDiaryDTO(diary: DiaryEntity) {
    return {
      ...diary,
      localeDate: diary.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    };
  }
}
