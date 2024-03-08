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
          dest: './logs/log.txt',
          sync: false,
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
})
export class AppLoggerModule {}
