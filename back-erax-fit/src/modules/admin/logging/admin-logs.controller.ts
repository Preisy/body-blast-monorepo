import { Controller, Get, Header, Logger, Param, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AdminLogsService } from './admin-logs.service';

@Controller('admin/logs')
@ApiTags('Admin logs')
export class AdminLogsController {
  constructor(private readonly service: AdminLogsService) {}
  private readonly logger = new Logger(AdminLogsController.name);

  @Get('/l')
  @AppResponses({ status: 200, type: 'file' })
  getSomeLogs(@Res() res: Response, @Param('lines') lines: number) {
    const writableData = this.service.getLinesFromLogs(lines);
    return res.send(writableData);
  }

  @Get()
  @Header('Content-Type', 'application/txt')
  @Header('Content-Disposition', 'attachment; filename="log.txt"')
  getLogFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), './logs/log.txt'));
    return new StreamableFile(file);
  }
}
