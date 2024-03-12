import { Injectable } from '@nestjs/common/decorators';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { UpdateAnthropometricsByClientRequest } from './dto/client-update-anthropometrics.dto';
import { BaseAnthropometrcisService } from '../../core/anthropometrics/base-anthropometrics.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientAnthropometricsService {
  constructor(
    private readonly baseService: BaseAnthropometrcisService,
    @InjectRepository(AnthropometricsEntity)
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  async findAll(
    user: UserEntity,
    request: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<AnthropometricsEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.anthrpRepository, this.relations);

    const { data: anthrpRecords } = await getPaginatedData(request);

    const anthrpUserRecords: AnthropometricsEntity[] = anthrpRecords.filter((data) => data.userId === user.id);

    return new AppDatePagination.Response(anthrpUserRecords, anthrpUserRecords.length);
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
