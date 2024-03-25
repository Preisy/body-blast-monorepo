import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
// eslint-disable-next-line import/no-named-as-default
import pino from 'pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        // eslint-disable-next-line import/no-named-as-default-member
        stream: pino.destination({
          dest: './log.txt',
          sync: false,
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            destination: './log.txt',
          },
        },
      },
    }),
  ],
})
export class AppLoggerModule {}
