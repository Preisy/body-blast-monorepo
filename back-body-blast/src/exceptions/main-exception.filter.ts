import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MainException } from './main.exception';
import { TelegramService } from '../modules/telegram/telegram.service';

@Catch(MainException)
export class MainExceptionFilter implements ExceptionFilter {
  constructor(private readonly telegramService: TelegramService) {}
  public async catch(exception: MainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = await ctx.getResponse();
    const request = await ctx.getRequest();
    const status = exception.status;

    if (status !== 401 && status !== 403) {
      await this.telegramService.notifyError(exception, request);
    }

    response.status(status).json(exception);
  }
}

@Catch(Error)
export class AppErrorFilter implements ExceptionFilter {
  constructor(private readonly telegramService: TelegramService) {}
  public async catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    await this.telegramService.notifyError(error, request);

    response.status(500).json(MainException.internalRequestError());
  }
}
