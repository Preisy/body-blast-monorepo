import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegramBotEntity } from './entity/telegram.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line import/no-unresolved
import { Chat } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot('infterns.logs') private readonly tgBot: Telegraf<Context>,
    @InjectRepository(TelegramBotEntity) private readonly telegramRepository: Repository<TelegramBotEntity>,
  ) {}

  private ctx: Context;
  async start(ctx: Context) {
    const chat = ctx.message?.chat as Chat.GroupChat;

    const newChatId = await this.telegramRepository.create(new TelegramBotEntity());
    newChatId.chatId = chat.id;
    await this.telegramRepository.save(newChatId);
    this.ctx = ctx;
  }

  onError(message: string) {
    const reply = `@@jacobzzzzzzz, @SteklotaraBlizz\n${message}`;
    this.ctx.reply(reply);
  }
}
