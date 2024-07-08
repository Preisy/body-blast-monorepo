import {
  Body,
  Controller,
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
import { Action } from '../../../constants/constants';
import { WorkoutHook } from '../../../modules/core/workout/workout.hook';

@ApiTags('Workouts')
@Controller('workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientWorkoutController {
  constructor(
    private readonly clientService: ClientWorkoutService,
    private readonly hook: WorkoutHook,
  ) {}

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    await this.hook.checkAbility(Action.ReadAll, req.user);
    return await this.clientService.findAll(req.user.id, query);
  }

  @Get('date')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    await this.hook.checkAbility(Action.ReadAll, req.user);
    return await this.clientService.findAllByDate(req.user.id, query);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkoutByClientRequest,
  ) {
    await this.hook.checkAbilityWithId(Action.Update, req.user, id);
    return await this.clientService.update(id, body);
  }
}
