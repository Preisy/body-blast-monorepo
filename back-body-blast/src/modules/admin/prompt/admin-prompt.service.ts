import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { BasePromptService } from '../../../modules/core/prompt/base-prompt.service';
import { PromptEntity } from '../../../modules/core/prompt/entity/prompt.entity';
import { AppPagination } from '../../../utils/app-pagination.util';
import { CreatePromptByAdminRequest } from './dto/admin-create-prompt.dto';
import { UpdatePromptByAdminRequest } from './dto/admin-update-prompt.dto';
import { GetPromptsByAdminRequest } from './dto/admin-get-prompts.dto';

@Injectable()
export class AdminPromptService {
  constructor(private readonly baseService: BasePromptService) {}

  async create(request: CreatePromptByAdminRequest): Promise<AppSingleResponse<PromptEntity>> {
    return this.baseService.create(request);
  }

  async findAll(
    query: AppPagination.Request,
    body: GetPromptsByAdminRequest,
  ): Promise<AppPagination.Response<PromptEntity>> {
    return this.baseService.findAll(query, body);
  }

  async update(id: PromptEntity['id'], request: UpdatePromptByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: PromptEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
