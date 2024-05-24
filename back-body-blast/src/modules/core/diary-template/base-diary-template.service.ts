import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { DiaryTemplatePropsEntity } from './entity/diary-template-props.entity';
import { UpdateDiaryTemplateRequest } from './dto/update-diary-template.dto';
import { DiaryTemplateEntity } from './entity/diary-template.entity';

@Injectable()
export class BaseDiaryTemplateService {
  constructor(
    @InjectRepository(DiaryTemplateEntity)
    private readonly diaryTemlpateRepository: Repository<DiaryTemplateEntity>,
    @InjectRepository(DiaryTemplatePropsEntity)
    private readonly templatePropsEntityRepository: Repository<DiaryTemplatePropsEntity>,
  ) {}
  public readonly relations: (keyof DiaryTemplateEntity)[] = ['props'];

  async createDefault(userId: UserEntity['id']) {
    const labels: { label: string }[] = [
      { label: 'Сон' },
      { label: 'Работоспособность' },
      { label: 'Питание' },
      { label: 'Слежу за здоровьем' },
    ];

    const newTemplate = this.diaryTemlpateRepository.create({
      userId,
      props: labels,
    });
    await this.diaryTemlpateRepository.save(newTemplate);
    return;
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

  async findOneByUserId(userId: UserEntity['id']) {
    const template = await this.diaryTemlpateRepository.findOne({
      where: {
        userId,
      },
      relations: this.relations,
    });

    if (!template) {
      throw MainException.entityNotFound(`Template with userId: ${userId} not found`);
    }
    return new AppSingleResponse(template);
  }

  async update(userId: UserEntity['id'], request: UpdateDiaryTemplateRequest) {
    const { data: template } = await this.findOneByUserId(userId);
    if (request.props) {
      await this.templatePropsEntityRepository.delete({
        templateId: template.id,
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
