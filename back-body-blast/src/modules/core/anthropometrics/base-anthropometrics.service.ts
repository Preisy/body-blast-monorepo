import { InjectRepository } from '@nestjs/typeorm';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAnthropometricsRequest } from './dto/update-anthropometrics';
import { MainException } from '../../../exceptions/main.exception';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { UserEntity } from '../user/entities/user.entity';
import { BaseUserService } from '../user/base-user.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRole } from '../../../constants/constants';
import { AppPagination } from '../../../utils/app-pagination.util';

@Injectable()
export class BaseAnthropometrcisService {
  constructor(
    @InjectRepository(AnthropometricsEntity)
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
    @Inject(forwardRef(() => BaseUserService))
    private readonly userService: BaseUserService,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async createAnthropometricsCron() {
    const { data: users } = await this.userService.getUsers(new AppPagination.Request(), {
      where: {
        role: UserRole.Client,
      },
    });

    const data = await this.findLatestAnthropometricsForEachUser();
    const anthrpMap = data.reduce(
      (acc, value) => ({ ...acc, [value.userId]: value }),
      {} as Record<string, AnthropometricsEntity>,
    );

    const createвAnthropometrics = users.flatMap((user) => {
      const userAnthrp = anthrpMap[user.id];
      const anthrpCreatedAt = userAnthrp.createdAt.getTime() || 0;
      if (Math.abs(anthrpCreatedAt - new Date().getTime()) >= user.anthrpJobPeriod! * 1000 * 60 * 60 * 24) {
        return this.anthrpRepository.create({ userId: user.id });
      }
      return [];
    });
    return this.anthrpRepository.save(createвAnthropometrics, { chunk: 10000 });
  }

  private async findLatestAnthropometricsForEachUser() {
    const subQuery = await this.anthrpRepository
      .createQueryBuilder('sub')
      .select('MAX(sub.createdAt)', 'maxCreatedAt')
      .where('sub.userId = main.userId')
      .groupBy('sub.userId');

    const latestAnthrp = await this.anthrpRepository
      .createQueryBuilder('main')
      .where(`main.createdAt = (${subQuery.getQuery()})`)
      .getMany();

    return latestAnthrp;
  }

  async createEmptyAnthrpRecordForUser(userId: UserEntity['id']) {
    const newAnthrp = await this.anthrpRepository.create(new AnthropometricsEntity());

    newAnthrp.userId = userId;

    return this.anthrpRepository.save(newAnthrp);
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
      relations: this.relations,
    });

    if (!antrp) throw MainException.entityNotFound(`Antropometrics with id ${id} not found`);

    return new AppSingleResponse(antrp);
  }

  async getAnthropometricsNotification(idUser: UserEntity['id']) {
    const latestAnthrp = await this.anthrpRepository.findOne({
      where: {
        userId: idUser,
      },
      order: { createdAt: 'DESC' },
    });
    if (!latestAnthrp) return false;

    return (
      latestAnthrp.abdomen == null ||
      latestAnthrp.hip == null ||
      latestAnthrp.hipVolume == null ||
      latestAnthrp.waist == null ||
      latestAnthrp.weight == null ||
      latestAnthrp.shoulder == null
    );
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
