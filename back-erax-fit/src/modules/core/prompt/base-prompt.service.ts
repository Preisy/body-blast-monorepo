import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { GetPromptsByAdminRequest } from 'src/modules/admin/prompt/dto/admin-get-prompts.dto';
import { AppPagination } from 'src/utils/app-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { FileEntity } from '../file/entity/file.entity';
import { CreatePromptRequest } from './dto/create-prompt.dto';
import { UpdatePromptRequest } from './dto/update-prompt.dto';
import { PromptEntity } from './entity/prompt.entity';

@Injectable()
export class BasePromptService {
  constructor(
    @InjectRepository(PromptEntity)
    private readonly promptRepository: Repository<PromptEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(request: CreatePromptRequest): Promise<AppSingleResponse<PromptEntity>> {
    if (!(await this.DoesExist(request.photoLink))) {
      throw MainException.entityNotFound(`File with link: ${request.photoLink} not found`);
    }
    if (!(await this.DoesExist(request.videoLink)))
      throw MainException.entityNotFound(`File with link: ${request.videoLink} not found`);
    const newPrompt = this.promptRepository.create({
      ...request,
    });

    const savedPrompt = await this.promptRepository.save(newPrompt);

    return new AppSingleResponse(savedPrompt);
  }

  async findAll(
    query: AppPagination.Request,
    body: GetPromptsByAdminRequest,
    options?: AppPagination.GetExecutorOptions<PromptEntity>,
  ): Promise<AppPagination.Response<PromptEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.promptRepository);
    const { data, count } = await getPaginatedData(query, options);
    const newData = data.filter((prompt) => prompt.type.includes(body.type));
    return new AppPagination.Response(newData, count);
  }

  async findOne(id: PromptEntity['id']): Promise<AppSingleResponse<PromptEntity>> {
    const prompt = await this.promptRepository.findOne({ where: { id } });

    if (!prompt) throw MainException.entityNotFound(`Prompt with id: ${id} not found`);
    return new AppSingleResponse(prompt);
  }

  async update(id: PromptEntity['id'], request: UpdatePromptRequest): Promise<AppSingleResponse<PromptEntity>> {
    if (!request.photoLink) {
      if (!(await this.DoesExist(request.photoLink!)))
        throw MainException.entityNotFound(`File with link: ${request.photoLink} not found`);
    }
    if (!request.videoLink) {
      if (!(await this.DoesExist(request.videoLink!)))
        throw MainException.entityNotFound(`File with link: ${request.videoLink} not found`);
    }
    const { data: prompt } = await this.findOne(id);

    const savedPrompt = await this.promptRepository.save({
      ...prompt,
      ...filterUndefined(request),
    });
    return new AppSingleResponse(savedPrompt);
  }

  async deleteOne(id: PromptEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.promptRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  private async DoesExist(fileLink: string): Promise<boolean> {
    const fileName = fileLink.split('/').pop();
    const file = await this.fileRepository.findOne({ where: { fileName } });
    if (!file) return false;
    return true;
  }
}
