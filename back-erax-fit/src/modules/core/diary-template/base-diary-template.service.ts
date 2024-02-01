import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { DiaryTemplatePropsEntity } from './diary-template-props/entity/diary-template-props.entity';
import { UpdateDiaryTemplateRequest } from './dto/update-diary-template.dto';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
import { UserEntity } from '../user/entities/user.entity';
import { AppPagination } from 'src/utils/app-pagination.util';

@Injectable()
export class BaseDiaryTemplateService {
  constructor(
    @InjectRepository(DiaryTemplateEntity)
    private readonly diaryTemlpateRepository: Repository<DiaryTemplateEntity>,
    @InjectRepository(DiaryTemplateEntity)
    private readonly templatePropsEntityRepository: Repository<DiaryTemplatePropsEntity>,
  ) {}
  public readonly relations: (keyof DiaryTemplateEntity)[] = ['props'];

  async createFromDefault(userId: UserEntity['id']): Promise<AppSingleResponse<DiaryTemplateEntity>> {
    const { data: defaultTemplate } = await this.findOne(1);
    const labels: { label: string }[] = defaultTemplate.props.map(({ label }) => ({ label }));

    const newTemplate = this.diaryTemlpateRepository.create({
      userId,
      props: labels,
    });
    console.log(newTemplate);
    const savedTemplate = await this.diaryTemlpateRepository.save(newTemplate);
    return new AppSingleResponse(savedTemplate);
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<DiaryTemplateEntity>,
  ): Promise<AppPagination.Response<DiaryTemplateEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.diaryTemlpateRepository, this.relations);
    return getPaginatedData(query, options);
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
}
