import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import type { Response } from 'express';

@Controller('admin/logs')
@ApiTags('Admin logs')
@AppAuthGuard()
export class AdminLogsController {
  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  seeUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, {
      root: './logs',
    });
  }
}
