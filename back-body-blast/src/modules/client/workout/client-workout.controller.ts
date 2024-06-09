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
  UseGuards,
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
import { CheckAbilities } from '../../../decorators/ability.decorator';
import { Action } from '../../../modules/ability/ability.factory';
import { AbilityGuard } from '../../../modules/authentication/guards/ability.guard';

@ApiTags('Workouts')
@Controller('workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientWorkoutController {
  constructor(private readonly clientService: ClientWorkoutService) {}

  @UseGuards(AbilityGuard)
  @Get()
  @CheckAbilities({ action: Action.Read, subject: WorkoutEntity })
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.clientService.findAll(query);
  }

  @UseGuards(AbilityGuard)
  @Get('date')
  @CheckAbilities({ action: Action.Read, subject: WorkoutEntity })
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Query() query: AppDatePagination.Request) {
    return await this.clientService.findAllByDate(query);
  }

  @UseGuards(AbilityGuard)
  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: WorkoutEntity })
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkoutByClientRequest,
  ) {
    return await this.clientService.update(req.user.id, id, body);
  }
}
