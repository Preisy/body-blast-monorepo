import { Injectable } from '@nestjs/common';
import { BaseSelfControlService } from 'src/modules/core/self-control/base-self-control.service';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { GetStepsByUserIdByClientDTO } from './dto/client-get-steps-by-userId.dto';
import { UpdateSelfControlByClientRequest } from './dto/client-update-self-control.dto';

@Injectable()
export class ClientSelfControlService {
  constructor(private readonly baseService: BaseSelfControlService) {}
  public readonly relations: (keyof SelfControlEntity)[] = ['user', 'props'];

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<SelfControlEntity>> {
    return this.baseService.findAll(query);
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
