import { Injectable } from '@nestjs/common/decorators';
import { BaseAnthropometrcisService } from '../../core/anthropometrics/base-anthropometrics.service';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../core/user/base-user.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { CreateAnthropometricsByAdminRequest } from './dto/create-anthropometrics-by-admin.dto';
import { GetAnthropometricsForUserByAdminRequest } from './dto/get-anthropometrics-for-user-by-admin.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { DateTime } from 'luxon';

@Injectable()
export class AdminAnthropometricsService {
  constructor(
    @InjectRepository(AnthropometricsEntity)
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
    private readonly baseService: BaseAnthropometrcisService,
    private readonly userService: BaseUserService,
    @InjectQueue('anthropometrics') private readonly anthrpQueue: Queue,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  async create(request: CreateAnthropometricsByAdminRequest) {
    return this.baseService.create(request);
  }

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

  async createAnthropometricsQueueJob() {
    let jobs = await this.anthrpQueue.getJobCounts();
    while (jobs.waiting < 7) {
      const everyDayAtMidnight = DateTime.fromObject({
        year: DateTime.local().year,
        month: DateTime.local().month,
        day: DateTime.local().plus({ days: jobs.waiting + 1 }).day,
        hour: 0,
        minute: 0,
        second: 0,
      })
        .setZone('utc')
        .toMillis();
      await this.anthrpQueue.add('schedule anthrp', await this.createAnthropometrics(), { delay: everyDayAtMidnight });
      jobs = await this.anthrpQueue.getJobCounts();
    }
    console.log(jobs);
  }

  async createAnthropometrics() {
    const { data: users } = await this.userService.getUsers(new AppPagination.Request(), {
      where: {
        role: UserRole.Client,
      },
    });

    const data = await this.findLatestAnthropometricsForEachUser();
    const anthrpMap = data.reduce(
      (acc, value) => ({ ...acc, [value.userId]: value }),
      {} as Record<number, AnthropometricsEntity>,
    );

    users.forEach((user) => {
      const userAnthrp = anthrpMap[user.id];
      user.anthrpJobPeriod;
      const anthrpCreatedAt = userAnthrp.createdAt.getTime() || 0;

      if (Math.abs(anthrpCreatedAt - new Date().getTime()) >= user.anthrpJobPeriod! * 1000 * 60 * 60 * 24) {
        this.anthrpRepository.save(this.anthrpRepository.create({ userId: user.id }));
      }
    });
  }

  async findLatestAnthropometricsForEachUser() {
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
}
