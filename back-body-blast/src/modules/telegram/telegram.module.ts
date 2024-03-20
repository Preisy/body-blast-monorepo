import { Global, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { TelegrafModule } from 'nestjs-telegraf';
import LocalSession from 'telegraf-session-local';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionCHatNotifierEntity } from './entity/telegram.entity';

const session = new LocalSession({ database: 'session_db.json' });

@Global()
@Module({
  imports: [
    TelegrafModule.forRoot({
      botName: 'ExceptionChatNotifier',
      middlewares: [session.middleware()],
      token: `${process.env.TELEGRAM_TOKEN}`,
      include: [TelegramModule],
    }),
    TypeOrmModule.forFeature([ExceptionCHatNotifierEntity]),
  ],
  providers: [TelegramService, TelegramUpdate],
  exports: [TelegramService],
})
export class TelegramModule {}
