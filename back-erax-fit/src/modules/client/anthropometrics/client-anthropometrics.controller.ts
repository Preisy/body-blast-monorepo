import {
  Controller,
  Req,
  Body,
  ParseIntPipe,
  Param,
  Patch,
  Get,
  Delete,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Query,
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

@Controller('anthropometrics')
@ApiTags('Anthropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientAnthropometricsController {
  constructor(private readonly clientService: ClientAnthropometricsService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(AnthropometricsEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    return await this.clientService.findAll(req.user, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AnthropometricsEntity) })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAnthropometricsByClientRequest) {
    return this.clientService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.delete(id);
  }
}
