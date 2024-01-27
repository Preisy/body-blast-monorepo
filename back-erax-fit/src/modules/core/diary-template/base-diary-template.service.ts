import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { TemplatePropsEntity } from '../template-props/entity/template-props.entity';
import { CreateDiaryTemplateRequest } from './dto/create-diary-template.dto';
import { UpdateDiaryTemplateRequest } from './dto/update-diary-template.dto';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
import { BaseUserService } from '../user/base-user.service';

@Injectable()
export class BaseDiaryTemplateService {
  constructor(
    @InjectRepository(DiaryTemplateEntity)
    private readonly diaryTemlpateRepository: Repository<DiaryTemplateEntity>,
    @InjectRepository(TemplatePropsEntity)
    private readonly templatePropsEntityRepository: Repository<TemplatePropsEntity>,
    private readonly userService: BaseUserService,
  ) {}
  public readonly relations: (keyof DiaryTemplateEntity)[] = ['props'];

  async create(request: CreateDiaryTemplateRequest): Promise<AppSingleResponse<DiaryTemplateEntity>> {
    const newTemplate = this.diaryTemlpateRepository.create({
      ...request,
    });
    const { data: user } = await this.userService.getUserById(request.userId);
    user.templateId = newTemplate.id;
    const savedTemplate = await this.diaryTemlpateRepository.save(newTemplate);
    return new AppSingleResponse(savedTemplate);
  }

  async findOne(id: DiaryTemplateEntity['id']) {
    const template = await this.diaryTemlpateRepository.findOne({
      where: {
        id,
      },
      relations: this.relations,
    });

    if (!template) {
      throw MainException.entityNotFound(`Template with id: ${id} not found`);
    }
    return new AppSingleResponse(template);
  }

  async update(id: DiaryTemplateEntity['id'], request: UpdateDiaryTemplateRequest) {
    const { data: template } = await this.findOne(id);
    if (request.props) {
      await this.templatePropsEntityRepository.delete({
        templateId: id,
      });
      template.props = [];
    }
    const savedTemplate = await this.diaryTemlpateRepository.save({
      ...template,
      ...filterUndefined(request),
    });
    return new AppSingleResponse(savedTemplate);
  }

  async deleteOne(id: DiaryTemplateEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.diaryTemlpateRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }
}
