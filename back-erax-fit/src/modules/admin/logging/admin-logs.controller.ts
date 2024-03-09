import { Controller, Get, Header, Param, ParseIntPipe, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';

@Controller('admin/logs')
@ApiTags('Admin logs')
export class AdminLogsController {
  @Get(':limit')
  @AppResponses({ status: 200, type: 'file' })
  async getSomeLogs(@Res() res: Response, @Param('limit', ParseIntPipe) limit: number, @Param('page') page: number) {
    fs.readFile('./logs/log.txt', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading file');
      }
      const skip = (page - 1) * limit! || 0;
      const lines = data.split('\n');
      const writableData = lines.slice(lines.length - (limit - skip), lines.length - skip).join('\n');
      return res.send(writableData);
    });
  }

  @Get()
  @Header('Content-Type', 'application/txt')
  @Header('Content-Disposition', 'attachment; filename="log.txt"')
  getLogFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), './logs/log.txt'));
    return new StreamableFile(file);
  }
}
