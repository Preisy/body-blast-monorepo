import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { MainException } from '../../../exceptions/main.exception';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { BaseUserService } from '../user/base-user.service';
import { GetDiaryDTO, GetLatestEmptyDiaryResponse } from './dto/get-diary.dto';
import { GetStepsByUserIdDTO, StepsByWeek } from './dto/get-steps.dto';
import { UpdateDiaryRequest } from './dto/update-diary.dto';
import { DiaryPropsEntity } from './entity/diary-props.entity';
import { DiaryEntity } from './entity/diary.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class BaseDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    @InjectRepository(DiaryPropsEntity)
    private readonly diaryPropsRepository: Repository<DiaryPropsEntity>,
    @Inject(forwardRef(() => BaseUserService))
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

  async createDefault(userId: UserEntity['id']) {
    const defaultDiary = await this.diaryRepository.create(new DiaryEntity());

    defaultDiary.userId = userId;
    defaultDiary.date = new Date();

    const savedDiary = await this.diaryRepository.save(defaultDiary);

    await this.createDefaultProp(savedDiary.id);
  }

  async createDefaultProp(diaryId: DiaryEntity['id']) {
    const defaultDiaryProp = await this.diaryPropsRepository.create(new DiaryPropsEntity());
    defaultDiaryProp.diaryId = diaryId;
    defaultDiaryProp.label = 'Питание';
    const savedProp = await this.diaryPropsRepository.save(defaultDiaryProp);
    return savedProp;
  }

  async findLatestEmptyDiary(idUser: UserEntity['id']) {
    const latestDiary = await this.diaryRepository.findOne({
      where: {
        userId: idUser,
      },
      order: { createdAt: 'DESC' },
    });
    if (!latestDiary) throw MainException.entityNotFound(`Diary with id ${idUser} not found`);

    if (
      latestDiary.activity == null ||
      latestDiary.sum == null ||
      latestDiary.steps == null ||
      latestDiary.cycle == null
    ) {
      const emptyAnthrpResponse: GetLatestEmptyDiaryResponse = {
        id: latestDiary.id,
        userId: latestDiary.userId,
        createdAt: latestDiary.createdAt,
      };

      return emptyAnthrpResponse;
    }
    return new GetLatestEmptyDiaryResponse();
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

    let firstDayOfWeek = query.from!;
    const lastDayOfWeek = query.from!;
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 7);

    let weeksCounter = 0;
    const result: StepsByWeek[] = [];
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
