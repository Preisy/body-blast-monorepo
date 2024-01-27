import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/constants/constants';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseDiaryTemplateService } from 'src/modules/core/diary-template/base-diary-template.service';
import { BaseSelfControlService } from 'src/modules/core/self-control/base-self-control.service';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { BaseUserService } from 'src/modules/core/user/base-user.service';
import { BaseWorkoutService } from 'src/modules/core/workout/base-workout.service';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { Repository } from 'typeorm';
import { CreateSelfControlByAdminRequest } from './dto/admin-create-self-control.dto';
import { GetStepsByUserIdByAdminDTO } from './dto/admin-get-steps-by-userId.dto';
import { UpdateSelfControlByAdminRequest } from './dto/admin-update-self-control.dto';
import { SelfControlPropsEntity } from 'src/modules/core/self-control-props/entity/self-control-props.entity';

@Injectable()
export class AdminSelfControlService {
  constructor(
    @InjectRepository(SelfControlEntity)
    private readonly selfControlRepository: Repository<SelfControlEntity>,
    private readonly baseService: BaseSelfControlService,
    private readonly workoutService: BaseWorkoutService,
    private readonly diaryTemplateService: BaseDiaryTemplateService,
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof SelfControlEntity)[] = ['user', 'props'];

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createSelfControlCron() {
    const { data: users } = await this.userService.getUsers(new AppDatePagination.Request(), {
      where: {
        role: UserRole.Client,
      },
    });

    users.forEach(async (user) => {
      const newSelfControl = this.selfControlRepository.create({
        userId: user.id,
      });
      const { data: template } = await this.diaryTemplateService.findOne(user.templateId);
      //newSelfControl.props = template.props;
      newSelfControl.props = new Array<SelfControlPropsEntity>();
      template.props.forEach((prop) => {
        const newProp = new SelfControlPropsEntity();
        newProp.label = prop.label;
        newSelfControl.props.push(newProp);
      });
      const newDate = new Date(Date.now());
      newDate.setHours(0, 0, 0, 0);
      newSelfControl.date = newDate;
      try {
        const { data: workout } = await this.workoutService.findOneByDate(newDate);
        newSelfControl.behaviour = `Цикл ${workout.loop}`;
      } catch (e) {
        newSelfControl.behaviour = 'Отдых';
      }
      await this.selfControlRepository.save(newSelfControl);
    });
  }

  async create(request: CreateSelfControlByAdminRequest): Promise<AppSingleResponse<SelfControlEntity>> {
    return this.baseService.create(request);
  }

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
  ): Promise<GetStepsByUserIdByAdminDTO> {
    return this.baseService.getStepsByUserId(userId, query);
  }

  async update(id: SelfControlEntity['id'], request: UpdateSelfControlByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: SelfControlEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
