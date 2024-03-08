import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class AdminLogsService {
  private readline = require('readline');
  private readLastLines = require('read-last-lines');

  // Function to read first 50 lines from a file
  readFirstLines(linesNumber: number) {
    const fileStream = fs.createReadStream('./logs/log.txt');
    const rl = this.readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const lines: string[] = [];

    // Read each line from the file
    rl.on('line', (line: string) => {
      lines.push(line);
      if (lines.length === linesNumber) {
        rl.close();
      }
    });

    return lines.join();
  }

  getLinesFromLogs(lines: number) {
    return this.readLastLines.read('./logs/log.txt', lines);
  }
}
