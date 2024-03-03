import { InjectRepository } from '@nestjs/typeorm';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { Repository } from 'typeorm';
import { CreateAnthropometricsRequest } from './dto/create-anthropometrics.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAnthropometricsRequest } from './dto/update-anthropometrics';
import { MainException } from '../../../exceptions/main.exception';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Injectable } from '@nestjs/common';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { UserEntity } from '../user/entities/user.entity';
import { GetLatestEmptyAnthropometricsResponse } from './dto/get-latest-empty-anthropometrics';

@Injectable()
export class BaseAnthropometrcisService {
  constructor(
    @InjectRepository(AnthropometricsEntity)
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  async create(request: CreateAnthropometricsRequest): Promise<AppSingleResponse<AnthropometricsEntity>> {
    const newAntrp = await this.anthrpRepository.create({
      ...request,
    });

    const savedAntrp = await this.anthrpRepository.save(newAntrp);

    return new AppSingleResponse(savedAntrp);
  }

  async findAll(
    query: AppDatePagination.Request,
    options?: AppDatePagination.GetExecutorOptions<AnthropometricsEntity>,
  ): Promise<AppDatePagination.Response<AnthropometricsEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.anthrpRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: AnthropometricsEntity['id']) {
    const antrp = await this.anthrpRepository.findOne({
      where: { id },
    });

    if (!antrp) throw MainException.entityNotFound(`Antropometrics with id ${id} not found`);

    return new AppSingleResponse(antrp);
  }

  async findLatestEmptyAnthropometrics(idUser: UserEntity['id']) {
    const latestAnthrp = await this.anthrpRepository.findOne({
      where: {
        userId: idUser,
      },
      order: { createdAt: 'DESC' },
    });
    if (!latestAnthrp) throw MainException.entityNotFound(`Antropometrics with id ${idUser} not found`);

    if (
      latestAnthrp.abdomen == null ||
      latestAnthrp.hip == null ||
      latestAnthrp.hipVolume == null ||
      latestAnthrp.waist == null ||
      latestAnthrp.weight == null ||
      latestAnthrp.shoulder == null
    ) {
      const emptyAnthrpResponse: GetLatestEmptyAnthropometricsResponse = {
        id: latestAnthrp.id,
        userId: latestAnthrp.userId,
        createdAt: latestAnthrp.createdAt,
        name: 'Anthropometrics empty record',
      };

      return emptyAnthrpResponse;
    }
    return new GetLatestEmptyAnthropometricsResponse();
  }

  async update(
    id: AnthropometricsEntity['id'],
    request: UpdateAnthropometricsRequest,
  ): Promise<AppSingleResponse<AnthropometricsEntity>> {
    const { data: antrp } = await this.findOne(id);

    const savedAntrp = await this.anthrpRepository.save({
      ...antrp,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedAntrp);
  }

  async delete(id: AnthropometricsEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.anthrpRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
