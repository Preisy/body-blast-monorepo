import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MainException } from './main.exception';

@Catch(MainException)
export class MainExceptionFilter implements ExceptionFilter {
  public catch(exception: MainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status;

    response.status(status).json(exception);
  }
}
