import {
  Controller,
  Req,
  Body,
  Param,
  Patch,
  Get,
  Delete,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { ClientAnthropometricsService } from './client-anthropometrics.service';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Throttle } from '@nestjs/throttler';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAnthropometricsByClientRequest } from './dto/client-update-anthropometrics.dto';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { Action } from '../../../modules/ability/ability.factory';
import { AbilityGuard } from '../../../modules/authentication/guards/ability.guard';
import { CheckAbilities } from '../../../decorators/ability.decorator';
import { AnthropometricsHook } from '../../../modules/core/anthropometrics/anthropometrics.hook';

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
    await this.hook.checkAbilityInstance(Action.Read, req.user);
    return await this.clientService.findAll(req.user, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Read, subject: AnthropometricsEntity })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityInstance(Action.Read, req.user, id);
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Update, subject: AnthropometricsEntity })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAnthropometricsByClientRequest,
  ) {
    await this.hook.checkAbilityInstance(Action.Update, req.user, id);
    return await this.clientService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @UseGuards(AbilityGuard)
  @CheckAbilities({ action: Action.Delete, subject: AnthropometricsEntity })
  @Throttle(5, 1)
  async delete(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    await this.hook.checkAbilityInstance(Action.Delete, req.user, id);
    return await this.clientService.delete(id);
  }
}
