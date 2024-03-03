import { Body, Controller, Get, Param, Patch, Query, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppAuthGuard } from 'src/modules/authentication/guards/appAuth.guard';
import { WorkoutEntity } from 'src/modules/core/workout/entity/workout.entity';
import { AppPagination } from 'src/utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { ClientWorkoutService } from './client-workout.service';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { UpdateWorkoutByClientRequest } from './dto/client-update-workout.dto';

@ApiTags('Workouts')
@Controller('workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientWorkoutController {
  constructor(private readonly clientService: ClientWorkoutService) {}

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  @AppAuthGuard()
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Req() req: RequestWithUser, @Param('id') id: number, @Body() body: UpdateWorkoutByClientRequest) {
    return await this.clientService.update(req.user.id, id, body);
  }
}
