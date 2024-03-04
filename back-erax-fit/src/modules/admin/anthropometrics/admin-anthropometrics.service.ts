import { Injectable } from '@nestjs/common/decorators';
import { BaseAnthropometrcisService } from '../../core/anthropometrics/base-anthropometrics.service';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAnthropometricsForUserByAdminRequest } from './dto/get-anthropometrics-for-user-by-admin.dto';

@Injectable()
export class AdminAnthropometricsService {
  constructor(
    @InjectRepository(AnthropometricsEntity)
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
    private readonly baseService: BaseAnthropometrcisService,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  async findAll(
    request: GetAnthropometricsForUserByAdminRequest,
  ): Promise<AppDatePagination.Response<AnthropometricsEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.anthrpRepository, this.relations);

    const query = request;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id } = query;
    const { data: anthrpRecords, count: count } = await getPaginatedData(query, {
      where: {
        userId: request.id,
      },
    });
    return new AppDatePagination.Response(anthrpRecords, count);
  }

  async findOne(id: AnthropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }
}
