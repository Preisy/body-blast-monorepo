import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { Repository } from 'typeorm';
import { CreateFileResponse } from './dto/create-file.dto';
import { FileEntity } from './entity/file.entity';

@Injectable()
export class BaseFileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    console.log();
  }

  async create(file: Express.Multer.File): Promise<CreateFileResponse> {
    const configService = new ConfigService();
    const newFile = this.fileRepository.create({
      fileName: file.filename,
      path: file.filename,
      fileLInk: configService.get('APP_BASE_URL') + '/' + file.filename,
    });

    const savedFile = await this.fileRepository.save(newFile);
    if (!savedFile) throw MainException.internalRequestError('Error upon saving file');

    return new CreateFileResponse(newFile);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<FileEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.fileRepository);
    return getPaginatedData(query);
  }
}
