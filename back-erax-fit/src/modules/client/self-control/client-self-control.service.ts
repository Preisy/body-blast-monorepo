import { Injectable } from '@nestjs/common';
import { BaseSelfControlService } from '../../../modules/core/self-control/base-self-control.service';
import { SelfControlEntity } from '../../../modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { GetStepsByUserIdByClientDTO } from './dto/client-get-steps-by-userId.dto';
import { UpdateSelfControlByClientRequest } from './dto/client-update-self-control.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';

@Injectable()
export class ClientSelfControlService {
  constructor(
    @InjectRepository(SelfControlEntity)
    private readonly selfControlRepository: Repository<SelfControlEntity>,
    private readonly baseService: BaseSelfControlService,
  ) {}
  public readonly relations: (keyof SelfControlEntity)[] = ['user', 'props'];

  async findAll(
    id: UserEntity['id'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<SelfControlEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.selfControlRepository, this.relations);

    const { data: selfControlRecords, count: count } = await getPaginatedData(query, {
      where: {
        userId: id,
      },
    });
    return new AppDatePagination.Response(selfControlRecords, count);
  }

  async findOne(id: SelfControlEntity['id']) {
    return this.baseService.findOne(id);
  }

  async findAllByUserId(
    userId: SelfControlEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<SelfControlEntity>> {
    return this.baseService.findAllByUserId(userId, query);
  }

  async getStepsByUserId(
    userId: SelfControlEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<GetStepsByUserIdByClientDTO> {
    return this.baseService.getStepsByUserId(userId, query);
  }

  async update(id: SelfControlEntity['id'], request: UpdateSelfControlByClientRequest) {
    return this.baseService.update(id, request);
  }
}
