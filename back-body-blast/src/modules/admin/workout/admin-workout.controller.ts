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
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AdminWorkoutService } from './admin-workout.service';
import { CreateWorkoutByAdminRequest } from './dto/admin-create-wrokout.dto';
import { GetWorkoutByAdminDTO, GetWorkoutForUserByAdminRequest } from './dto/admin-get-workout.dto';
import { UpdateWorkoutByAdminRequest } from './dto/admin-update-workout.dto';
import { WorkoutEntity } from '../../../modules/core/workout/entity/workout.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { AbilityFactory, Action } from '../../../modules/ability/ability.factory';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { MainException } from '../../../exceptions/main.exception';

@Controller('admin/workouts')
@ApiTags('Admin workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class AdminWorkoutController {
  constructor(
    private readonly adminService: AdminWorkoutService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Req() req: RequestWithUser, @Body() request: CreateWorkoutByAdminRequest) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot create workout');
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(WorkoutEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot get workout');
    return await this.adminService.findAll(query);
  }

  @Get('date')
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(WorkoutEntity) })
  async getAllByDate(@Req() req: RequestWithUser, @Query() query: GetWorkoutForUserByAdminRequest) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot get workout');
    return await this.adminService.findAllByDate(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetWorkoutByAdminDTO) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot get workout');
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateWorkoutByAdminRequest,
  ) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot update workout');
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    const ability = this.abilityFactory.defineAbility(req.user);

    if (!ability.can(Action.Manage, WorkoutEntity)) throw MainException.forbidden('Cannot delete workout');
    return await this.adminService.deleteOne(id);
  }
}
