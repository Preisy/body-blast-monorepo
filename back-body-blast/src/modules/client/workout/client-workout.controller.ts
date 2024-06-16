import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';
import { AppPagination } from '../../../utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { ClientWorkoutService } from './client-workout.service';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { UpdateWorkoutByClientRequest } from './dto/client-update-workout.dto';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AbilityFactory, Action } from '../../../modules/ability/ability.factory';
import { MainException } from '../../../exceptions/main.exception';
import { BaseWorkoutService } from 'src/modules/core/workout/base-workout.service';
import { ForbiddenError } from '@casl/ability';
import { GetWorkoutDTO } from 'src/modules/core/workout/dto/get-workout.dto';

@ApiTags('Workouts')
@Controller('workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientWorkoutController {
  constructor(
    private readonly clientService: ClientWorkoutService,
    private readonly abilityFactory: AbilityFactory,
    private readonly baseService: BaseWorkoutService,
  ) {}

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Read, WorkoutEntity)) throw MainException.forbidden('Cannot get workout');
    return await this.clientService.findAll(req.user.id, query);
  }

  @Get('date')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Read, WorkoutEntity)) throw MainException.forbidden('Cannot get workout');
    return await this.clientService.findAllByDate(req.user.id, query);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkoutByClientRequest,
  ) {
    const ability = this.abilityFactory.defineAbility(req.user);
    const { data: workout } = await this.baseService.findOne(id);

    const newWorkout = new WorkoutEntity();
    Object.assign(newWorkout, workout);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, newWorkout, 'comment');
      return await this.clientService.update(id, body);
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }
}
