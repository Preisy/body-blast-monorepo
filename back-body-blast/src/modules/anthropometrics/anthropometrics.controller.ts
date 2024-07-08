import {
  Body,
  Controller,
  Delete,
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
import { AppAuthGuard } from '../authentication/guards/appAuth.guard';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { AnthropometricsHook } from './anthropometrics.hook';
import { AnthropometricsService } from './anthropometrics.service';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { Action, UserRole } from '../../constants/constants';
import { AppDatePagination } from '../../utils/app-date-pagination.util';
import { GetAnthropometricsForUserRequest } from './dto/get-anthropometrics.dto';
import { UpdateAnthropometricsRequest } from './dto/update-anthropometrics';
import { Throttle } from '@nestjs/throttler';
import { AppStatusResponse } from '../../dto/app-status-response.dto';

@Controller('anthropometrics')
@ApiTags('Anthropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AnthropometricsController {
  constructor(
    private readonly service: AnthropometricsService,
    private readonly hook: AnthropometricsHook,
  ) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: GetAnthropometricsForUserRequest) {
    if (req.user.role === UserRole.Client) {
      query.userId = req.user.id;
      await this.hook.checkAbility(Action.ReadAll, req.user);
      return this.service.findAll(query);
    } else {
      await this.hook.checkAbility(Action.All, req.user);
      return this.service.findAll(query);
    }
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    if (req.user.role === UserRole.Client) {
      await this.hook.checkAbilityWithId(Action.Read, req.user, id);
      return this.service.findOne(id);
    } else {
      await this.hook.checkAbilityWithId(Action.All, req.user, id);
      return this.service.findOne(id);
    }
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAnthropometricsRequest,
  ) {
    await this.hook.checkAbilityWithId(Action.Update, req.user, id);
    return await this.service.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityWithId(Action.Delete, req.user, id);
    return await this.service.delete(id);
  }
}
