import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { BaseUserService } from '../user/base-user.service';
import { GetDiaryDTO } from './dto/get-diary.dto';
import { GetStepsByUserIdDTO, StepsByWeek } from './dto/get-steps.dto';
import { UpdateDiaryRequest } from './dto/update-diary.dto';
import { DiaryPropsEntity } from './entity/diary-props.entity';
import { DiaryEntity } from './entity/diary.entity';

@Injectable()
export class BaseDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    @InjectRepository(DiaryPropsEntity)
    private readonly diaryPropsRepository: Repository<DiaryPropsEntity>,
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

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

    let firstDayOfWeek = query.from!;
    let lastDayOfWeek = query.from!;
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

    let weeksCounter = 0;
    let result: StepsByWeek[] = [];
    while (weeksCounter < 4) {
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
      firstDayOfWeek = lastDayOfWeek;
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);
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
