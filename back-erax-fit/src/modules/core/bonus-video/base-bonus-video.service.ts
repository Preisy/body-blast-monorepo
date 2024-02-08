import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusVideoEntity } from './entities/bonus-video.entity';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { MainException } from '../../../exceptions/main.exception';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { CreateVideoRequest } from './dto/create-video.dto';

@Injectable()
export class BaseBonusVideoService {
  constructor(
    @InjectRepository(BonusVideoEntity)
    private readonly videoRepository: Repository<BonusVideoEntity>,
  ) {}

  async create(request: CreateVideoRequest): Promise<AppSingleResponse<BonusVideoEntity>> {
    const savedVideo = await this.videoRepository.save(
      this.videoRepository.create({
        ...request,
      }),
    );

    return new AppSingleResponse(savedVideo);
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<BonusVideoEntity>,
  ): Promise<AppPagination.Response<BonusVideoEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.videoRepository);
    return getPaginatedData(query, options);
  }

  async findOne(id: BonusVideoEntity['id']): Promise<AppSingleResponse<BonusVideoEntity>> {
    const video = await this.videoRepository.findOne({
      where: { id },
    });

    if (!video) throw MainException.entityNotFound(`Video with id ${id} not found`);

    return new AppSingleResponse(video);
  }

  async delete(id: BonusVideoEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.videoRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
