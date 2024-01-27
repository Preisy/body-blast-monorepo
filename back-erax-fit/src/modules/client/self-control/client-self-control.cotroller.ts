import { Body, Controller, Get, Param, Patch, Query, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { SelfControlEntity } from '../../../modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { ClientSelfControlService } from './client-self-control.service';
import { GetSelfControlByClientDTO } from './dto/client-get-self-control.dto';
import { UpdateSelfControlByClientRequest } from './dto/client-update-self-control.dto';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';

@Controller('self-control')
@ApiTags('Self-control')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientSelfControlController {
  constructor(private readonly clientService: ClientSelfControlService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(SelfControlEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
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
