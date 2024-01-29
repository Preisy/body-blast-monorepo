import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { BaseUserService } from '../user/base-user.service';
import { DiaryPropsEntity } from './diary-props/entity/diary-props.entity';
import { GetStepsByUserIdDTO } from './dto/get-steps.dto';
import { DiaryEntity } from './entity/diary.entity';
import { CreateDiaryRequest } from './dto/create-diary.dto';
import { UpdateDiaryRequest } from './dto/update-diary.dto';
import { GetDiaryDTO } from './dto/get-diary.dto';

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

  async create(request: CreateDiaryRequest): Promise<AppSingleResponse<DiaryEntity>> {
    const newDiary = this.diaryRepository.create({
      ...request,
      date: new Date(request.date),
    });
    const savedDiary = await this.diaryRepository.save(newDiary);
    return new AppSingleResponse<GetDiaryDTO>(this.getSelfControlDTO(savedDiary));
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
    return new AppSingleResponse<GetDiaryDTO>(this.getSelfControlDTO(diary));
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
    const { data: selfControls } = await this.findAllByUserId(userId, query);
    let steps = 0;
    selfControls.forEach((selfControl) => {
      if (selfControl.steps) steps += selfControl.steps;
    });
    const { data: user } = await this.userService.getUserById(userId);
    const stepsGoal = user.stepsGoal;
    return new GetStepsByUserIdDTO(steps, stepsGoal);
  }

  async update(id: DiaryEntity['id'], request: UpdateDiaryRequest) {
    const { data: diary } = await this.findOne(id);
    if (request.props) {
      diary.sum = 0;
      request.props.forEach((prop) => {
        diary.sum! += prop.value;
      });

      await this.diaryPropsRepository.delete({
        diaryId: id,
      });
      diary.props = [];
    }
    const savedDiary = await this.diaryRepository.save({
      ...diary,
      ...filterUndefined(request),
    });
    return new AppSingleResponse<GetDiaryDTO>(this.getSelfControlDTO(savedDiary));
  }

  async deleteOne(id: DiaryEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.diaryRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  private getSelfControlDTO(diary: DiaryEntity) {
    return {
      ...diary,
      localeDate: diary.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    };
  }
}
