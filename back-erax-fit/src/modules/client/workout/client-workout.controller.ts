import { Controller, Get, Query, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppAuthGuard } from 'src/modules/authentication/guards/appAuth.guard';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { AppPagination } from 'src/utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { ClientWorkoutService } from './client-workout.service';

@Controller()
@ApiTags('Workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientWorkoutController {
  constructor(private readonly clientService: ClientWorkoutService) {}

  @Get('workouts')
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  @AppAuthGuard()
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }
}
