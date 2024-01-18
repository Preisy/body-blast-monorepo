import { Injectable } from '@nestjs/common/decorators';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { CreateAnthropometricsByClientRequest } from './dto/client-create-anthropometrics.dto';
import { UpdateAnthropometricsByClientRequest } from './dto/client-update-anthropometrics.dto';
import { BaseAnthropometrcisService } from '../../core/anthropometrics/base-anthropometrics.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Injectable()
export class ClientAnthropometricsService {
  constructor(private readonly baseService: BaseAnthropometrcisService) {}

  async create(user: UserEntity, request: CreateAnthropometricsByClientRequest) {
    request.userId = user.id;
    return this.baseService.create(request);
  }

  async findAll(
    user: UserEntity,
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<AnthropometricsEntity>> {
    return this.baseService.findAll(query, { where: { userId: user.id } });
  }

  async findOne(id: AnthropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  async update(id: AnthropometricsEntity['id'], request: UpdateAnthropometricsByClientRequest) {
    return this.baseService.update(id, request);
  }

  async delete(id: AnthropometricsEntity['id']) {
    return this.baseService.delete(id);
  }
}
