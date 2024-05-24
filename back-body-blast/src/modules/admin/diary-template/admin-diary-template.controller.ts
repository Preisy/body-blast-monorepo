import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { AdminDiaryTemplateService } from './admin-diary-template.service';
import { UpdateDiaryTemplateByAdminRequest } from './dto/admin-update-diary-template.dto';

@Controller('admin/diary-templates')
@ApiTags('Admin diary templates')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminDiaryTemplateController {
  constructor(private readonly adminService: AdminDiaryTemplateService) {}

  @Get(':userId')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async getOne(@Param('userId', ParseUUIDPipe) userId: string) {
    return await this.adminService.findOne(userId);
  }

  @Patch(':userId')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('userId', ParseUUIDPipe) userId: string, @Body() body: UpdateDiaryTemplateByAdminRequest) {
    return await this.adminService.update(userId, body);
  }
}
