import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { MainException } from 'src/exceptions/main.exception';
import { AppPagination } from 'src/utils/app-pagination.util';
import { Repository } from 'typeorm';
import { CreateFileResponse } from './dto/create-file.dto';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {
    console.log();
  }

  async createFile(file: Express.Multer.File): Promise<CreateFileResponse> {
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

  async getFiles(query: AppPagination.Request): Promise<AppPagination.Response<FileEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.fileRepository);
    return getPaginatedData(query);
  }
}
