import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { ExceptionCHatNotifierEntity } from './entity/telegram.entity';
import { Repository } from 'typeorm';
// eslint-disable-next-line import/no-unresolved
import { Chat } from 'telegraf/typings/core/types/typegram';
import { MainException } from '../../exceptions/main.exception';
import { Request } from 'express';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot('ExceptionChatNotifier') private readonly tgBot: Telegraf<Context>,
    @InjectRepository(ExceptionCHatNotifierEntity)
    private readonly telegramRepository: Repository<ExceptionCHatNotifierEntity>,
  ) {}

  async start(ctx: Context) {
    const chat = ctx.message?.chat as Chat.GroupChat;

    const newChatId = await this.telegramRepository.create(new ExceptionCHatNotifierEntity());
    newChatId.chatId = chat.id;
    await this.telegramRepository.save(newChatId);
  }

  async notifyError(exception: MainException, request: Request): Promise<void>;
  async notifyError(error: Error, request: Request): Promise<void>;
  async notifyError(exception: MainException | Error, request: Request) {
    const nicknames = '@ghtca, @jacobzzzzzzz, @SteklotaraBlizz, @cbetujlhuk';

    const req = {
      id: request.id,
      method: request.method,
      url: request.url,
      query: request.query,
      params: request.params,
      headers: request.headers,
      body: request.body,
      user: JSON.stringify(request.user),
    };
    const err =
      exception instanceof MainException
        ? JSON.stringify(exception, null, 2)
        : JSON.stringify(exception, Object.getOwnPropertyNames(exception), 2);
    const reply = `${nicknames}\n[] ERROR: ${exception.message}\nREQ:\`\`\`${JSON.stringify(
      req,
      null,
      2,
    )}\`\`\` \nERR:\`\`\`${err}\`\`\``;
    const chatIds = await this.telegramRepository.find();

    await Promise.all(
      Array.from({ length: Math.ceil(reply.length / 4096) }, (_, index) => index * 4096).map(async (item) => {
        await Promise.all(
          chatIds.map(async (bot) => {
            await this.tgBot.telegram.sendMessage(bot.chatId as number, reply.substring(item, item + 4096), {
              parse_mode: 'Markdown',
            });
          }),
        );
      }),
    );
  }
}
