import { Injectable } from '@nestjs/common';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { GetStepsByUserIdByClientDTO } from './dto/client-get-steps-by-userId.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/user/entities/user.entity';
import { DiaryEntity } from 'src/modules/core/diary/entity/diary.entity';
import { BaseDiaryService } from 'src/modules/core/diary/base-diary.service';
import { UpdateDiaryByClientRequest } from './dto/client-update-diary.dto';

@Injectable()
export class ClientDiaryService {
  constructor(
    @InjectRepository(DiaryEntity)
    private readonly diaryRepository: Repository<DiaryEntity>,
    private readonly baseService: BaseDiaryService,
  ) {}
  public readonly relations: (keyof DiaryEntity)[] = ['user', 'props'];

  async findAll(
    id: UserEntity['id'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<DiaryEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.diaryRepository, this.relations);

    const { data: diaryRecords, count: count } = await getPaginatedData(query, {
      where: {
        userId: id,
      },
    });
    return new AppDatePagination.Response(diaryRecords, count);
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
  ): Promise<GetStepsByUserIdByClientDTO> {
    return this.baseService.getStepsByUserId(userId, query);
  }

  async update(id: DiaryEntity['id'], request: UpdateDiaryByClientRequest) {
    return this.baseService.update(id, request);
  }
}
