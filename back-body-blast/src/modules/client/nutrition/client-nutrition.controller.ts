import { Controller, Get, Query, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { AppPagination } from '../../../utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { ClientNutritionService } from './client-nutrition.service';
import { NutritionEntity } from '../../../modules/core/nutrition/entity/nutrition.entity';

@Controller()
@ApiTags('Nutrition')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientNutritionController {
  constructor(private readonly clientService: ClientNutritionService) {}

  @Get('nutrition')
  @AppResponses({ status: 200, type: AppPagination.Response.type(NutritionEntity) })
  @BaseAuthGuard()
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }
}
