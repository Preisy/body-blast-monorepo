import {
  Controller,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Get,
  Req,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { ClientBonusVideoService } from './client-bonus-video.service';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';

@Controller('bonus-video')
@ApiTags('Bonus video')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientBonusVideoController {
  constructor(private readonly clientService: ClientBonusVideoService) {}

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(BonusVideoEntity) })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    if (!req.user.canWatchVideo) throw MainException.forbidden(`Access denied for user with id ${req.user.id}`);
    return await this.clientService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(BonusVideoEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('id', ParseUUIDPipe) id: string) {
    if (!req.user.canWatchVideo) throw MainException.forbidden(`Access denied for user with id ${req.user.id}`);
    return await this.clientService.findOne(id);
  }
}
