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
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { Action } from '../../../modules/ability/ability.factory';
import { AnthropometricsHook } from '../../../modules/core/anthropometrics/anthropometrics.hook';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { ClientAnthropometricsService } from './client-anthropometrics.service';
import { UpdateAnthropometricsByClientRequest } from './dto/client-update-anthropometrics.dto';

@Controller('anthropometrics')
@ApiTags('Anthropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientAnthropometricsController {
  constructor(
    private readonly clientService: ClientAnthropometricsService,
    private readonly hook: AnthropometricsHook,
  ) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    await this.hook.checkAbility(Action.Read, req.user);
    return await this.clientService.findAll(req.user, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbility(Action.Read, req.user, id);
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAnthropometricsByClientRequest,
  ) {
    await this.hook.checkAbility(Action.Update, req.user, id);
    return await this.clientService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbility(Action.Delete, req.user, id);
    return await this.clientService.delete(id);
  }
}
