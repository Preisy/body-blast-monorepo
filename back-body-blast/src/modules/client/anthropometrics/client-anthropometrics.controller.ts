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
  ForbiddenException,
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
import { AbilityFactory, Action } from '../../../modules/ability/ability.factory';
import { MainException } from '../../../exceptions/main.exception';
import { BaseAnthropometrcisService } from '../../../modules/core/anthropometrics/base-anthropometrics.service';
import { ForbiddenError } from '@casl/ability';

@Controller('anthropometrics')
@ApiTags('Anthropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientAnthropometricsController {
  constructor(
    private readonly clientService: ClientAnthropometricsService,
    private readonly abilityFactory: AbilityFactory,
    private readonly baseService: BaseAnthropometrcisService,
  ) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    const ability = this.abilityFactory.defineAbility(req.user);
    if (!ability.can(Action.Read, AnthropometricsEntity)) throw MainException.forbidden('Cannot get anthropometrics');
    return await this.clientService.findAll(req.user, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    const ability = this.abilityFactory.defineAbility(req.user);
    const { data: anthropometrics } = await this.baseService.findOne(id);

    const newAnthrp = new AnthropometricsEntity();
    Object.assign(newAnthrp, anthropometrics);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Read, newAnthrp, req.user.id);
      return await this.clientService.findOne(id);
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async update(
    @Req() req: RequestWithUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateAnthropometricsByClientRequest,
  ) {
    const ability = this.abilityFactory.defineAbility(req.user);
    const { data: anthropometrics } = await this.baseService.findOne(id);

    const newAnthrp = new AnthropometricsEntity();
    Object.assign(newAnthrp, anthropometrics);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, newAnthrp, req.user.id);
      return await this.clientService.update(id, body);
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    const ability = this.abilityFactory.defineAbility(req.user);
    const { data: anthropometrics } = await this.baseService.findOne(id);

    const newAnthrp = new AnthropometricsEntity();
    Object.assign(newAnthrp, anthropometrics);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Delete, newAnthrp, req.user.id);
      return await this.clientService.delete(id);
    } catch (err) {
      throw MainException.forbidden(err.message);
    }
  }
}
