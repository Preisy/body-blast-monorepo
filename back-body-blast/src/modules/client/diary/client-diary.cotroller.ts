import {
  Body,
  Controller,
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
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { ClientDiaryService } from './client-diary.service';
import { DiaryEntity } from '../../../modules/core/diary/entity/diary.entity';
import { GetDiaryByClientDTO } from './dto/client-get-diary.dto';
import { UpdateDiaryByClientRequest } from './dto/client-update-diary.dto';

@Controller('diary')
@ApiTags('Diary')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@AppAuthGuard()
export class ClientDiaryController {
  constructor(private readonly clientService: ClientDiaryService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response.type(DiaryEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppDatePagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetDiaryByClientDTO) })
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateDiaryByClientRequest) {
    return await this.clientService.update(id, body);
  }
}
