import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../authentication/guards/appAuth.guard';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { WorkoutHook } from './workout.hook';
import { WorkoutService } from './workout.service';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { UpdateCommentRequest, UpdateWorkoutRequest } from './dto/update-workout.dto';
import { Action, UserRole } from '../../constants/constants';
import { GetWorkoutDTO, GetWorkoutForUserRequest, GetWorkoutForUserByDateRequest } from './dto/get-workout.dto';
import { WorkoutEntity } from './entity/workout.entity';
import { AppDatePagination } from '../../utils/app-date-pagination.util';
import { AppPagination } from '../../utils/app-pagination.util';
import { Throttle } from '@nestjs/throttler';
import { CreateWorkoutRequest } from './dto/create-workout.dto';
import { AppStatusResponse } from '../../dto/app-status-response.dto';

@ApiTags('Workouts')
@Controller('workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class WorkoutController {
  constructor(
    private readonly service: WorkoutService,
    private readonly hook: WorkoutHook,
  ) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Req() req: RequestWithUser, @Body() request: CreateWorkoutRequest) {
    await this.hook.checkAbility(Action.All, req.user);
    return await this.service.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: GetWorkoutForUserRequest) {
    if (req.user.role === UserRole.Client) {
      query.userId = req.user.id;
      await this.hook.checkAbility(Action.ReadAll, req.user);
      return this.service.findAll(query, { where: { userId: req.user.id } });
    } else {
      await this.hook.checkAbility(Action.All, req.user);
      return this.service.findAll(query, { where: { userId: query.userId } });
    }
  }

  @Get('date')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Req() req: RequestWithUser, @Query() query: GetWorkoutForUserByDateRequest) {
    if (req.user.role === UserRole.Client) {
      query.userId = req.user.id;
      await this.hook.checkAbility(Action.ReadAll, req.user);
      return this.service.findAllByDate(query);
    } else {
      await this.hook.checkAbility(Action.All, req.user);
      return this.service.findAllByDate(query);
    }
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetWorkoutDTO) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityWithId(Action.All, req.user, id);
    return await this.service.findOne(id);
  }

  @Patch(':id/comment')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async updateComment(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCommentRequest,
  ) {
    await this.hook.checkAbilityWithId(Action.Update, req.user, id);
    return this.service.update(id, body);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkoutRequest,
  ) {
    await this.hook.checkAbility(Action.All, req.user);
    return this.service.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbility(Action.All, req.user);
    return await this.service.deleteOne(id);
  }
}
