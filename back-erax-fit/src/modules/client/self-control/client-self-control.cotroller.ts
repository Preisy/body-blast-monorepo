import { Body, Controller, Get, Param, Patch, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppAuthGuard } from 'src/modules/authentication/guards/appAuth.guard';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { ClientSelfControlService } from './client-self-control.service';
import { GetSelfControlByClientDTO } from './dto/client-get-self-control.dto';
import { UpdateSelfControlByClientRequest } from './dto/client-update-self-control.dto';

@Controller('self-control')
@ApiTags('Self-control')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientSelfControlController {
  constructor(private readonly clientService: ClientSelfControlService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(SelfControlEntity) })
  async getAll(@Query() query: AppDatePagination.Request) {
    return await this.clientService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetSelfControlByClientDTO) })
  async getOne(@Param('id') id: number) {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdateSelfControlByClientRequest) {
    return await this.clientService.update(id, body);
  }
}
