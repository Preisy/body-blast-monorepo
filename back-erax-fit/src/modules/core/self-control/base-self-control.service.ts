import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { CreateSelfControlRequest } from './dto/create-self-control.dto';
import { GetSelfControlDTO } from './dto/get-self-control.dto';
import { UpdateSelfControlRequest } from './dto/update-self-control.dto';
import { SelfControlEntity } from './entity/self-control.entity';
import { BaseUserService } from '../user/base-user.service';
import { GetStepsByUserIdDTO } from './dto/get-steps.dto';
import { SelfControlPropsEntity } from '../self-control-props/entity/self-control-props.entity';

@Injectable()
export class BaseSelfControlService {
  constructor(
    @InjectRepository(SelfControlEntity)
    private readonly selfControlRepository: Repository<SelfControlEntity>,
    @InjectRepository(SelfControlPropsEntity)
    private readonly selfControlPropsRepository: Repository<SelfControlPropsEntity>,
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof SelfControlEntity)[] = ['user', 'props'];

  async create(request: CreateSelfControlRequest): Promise<AppSingleResponse<SelfControlEntity>> {
    const newSelfControl = this.selfControlRepository.create({
      ...request,
      date: new Date(request.date),
    });
    const savedSelfControl = await this.selfControlRepository.save(newSelfControl);
    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(savedSelfControl));
  }

  async findAll(
    query: AppDatePagination.Request,
    options?: AppDatePagination.GetExecutorOptions<SelfControlEntity>,
  ): Promise<AppDatePagination.Response<SelfControlEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.selfControlRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: SelfControlEntity['id']) {
    const selfControl = await this.selfControlRepository.findOne({
      where: {
        id,
      },
      relations: this.relations,
    });

    if (!selfControl) {
      throw MainException.entityNotFound(`Self control with id: ${id} not found`);
    }
    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(selfControl));
  }

  async findAllByUserId(
    userId: SelfControlEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<SelfControlEntity>> {
    return this.findAll(query, {
      where: {
        userId,
      },
    });
  }

  async getStepsByUserId(
    userId: SelfControlEntity['userId'],
    query: AppDatePagination.Request,
  ): Promise<GetStepsByUserIdDTO> {
    const { data: selfControls } = await this.findAllByUserId(userId, query);
    let steps = 0;
    selfControls.forEach((selfControl) => {
      if (selfControl.steps) steps += selfControl.steps;
    });
    const { data: user } = await this.userService.getUserById(userId);
    const stepsGoal = user.stepsGoal;
    return new GetStepsByUserIdDTO(steps, stepsGoal);
  }

  async update(id: SelfControlEntity['id'], request: UpdateSelfControlRequest) {
    const { data: selfControl } = await this.findOne(id);
    if (request.props) {
      selfControl.sum = 0;
      request.props.forEach((prop) => {
        selfControl.sum! += prop.value;
      });

      await this.selfControlPropsRepository.delete({
        selfControlId: id,
      });
      selfControl.props = [];
    }
    const savedSelfControl = await this.selfControlRepository.save({
      ...selfControl,
      ...filterUndefined(request),
    });
    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(savedSelfControl));
  }

  async deleteOne(id: SelfControlEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.selfControlRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  private getSelfControlDTO(selfControl: SelfControlEntity) {
    return {
      ...selfControl,
      localeDate: selfControl.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    };
  }
}
