import { Controller, Get, Header, ParseIntPipe, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { BaseAuthGuard } from '../../../modules/authentication/guards/baseAuth.guard';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { UserRole } from '../../../constants/constants';

@Controller('admin/logs')
@ApiTags('Admin logs')
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminLogsController {
  @Get()
  @AppResponses({ status: 200, type: String })
  async getSomeLogs(
    @Res() res: Response,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    const data = await new Promise<string>((res, rej) =>
      fs.readFile('./log.txt', 'utf-8', (err, data) => {
        if (err) rej(err);
        else res(data);
      }),
    );
    const skip = (page - 1) * limit! || 0;
    const lines = data.split('\n');
    const writableData = lines.slice(lines.length - limit * page, lines.length - skip).join('\n');
    return res.send(writableData);
  }

  @Get('file')
  @AppResponses({ status: 200 })
  @Header('Content-Disposition', 'attachment; filename="log.txt"')
  getLogFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), './log.txt'));
    return new StreamableFile(file);
  }
}
