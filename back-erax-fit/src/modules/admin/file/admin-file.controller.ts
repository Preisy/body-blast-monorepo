import {
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { diskStorage } from 'multer';
import { UserRole } from '../../../constants/constants';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AdminFileService } from './admin-file.service';
import { CreateFileByAdminResponse } from './dto/admin-create-file.dto';
import { FileEntity } from '../../../modules/core/file/entity/file.entity';

@Controller('admin/files')
@ApiTags('Admin files')
export class AdminFileController {
  constructor(private readonly adminfilesService: AdminFileService) {}

  @Post()
  @AppResponses({ status: 201, type: CreateFileByAdminResponse })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png|mp4)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.adminfilesService.create(file);
  }

  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  @BaseAuthGuard()
  seeUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, {
      root: './uploads',
    });
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response.type(FileEntity) })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: AppPagination.Request) {
    return await this.adminfilesService.findAll(query);
  }
}
