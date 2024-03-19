import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MainException } from './main.exception';
import { TelegramService } from '../modules/telegram/telegram.service';

@Catch(MainException)
export class MainExceptionFilter implements ExceptionFilter {
  private readonly telegramService: TelegramService;
  public catch(exception: MainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status;

    if (!(exception instanceof MainException.forbidden) || !(exception instanceof MainException.unauthorized)) {
      this.telegramService.onError(`${status}, ${ctx.getRequest()} ,${response}`);
    }

    response.status(status).json(exception);
  }
}

@Catch(Error)
export class AppErrorFilter implements ExceptionFilter {
  private readonly telegramService: TelegramService;
  public catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    this.telegramService.onError(`500, ${request}, ${response}, ${error}`);

    response.status(500).json(MainException.internalRequestError());
  }
}
