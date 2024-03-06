import { ExecutionContext, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private logger = new Logger('AppLogger');

  info(req: Request, res: Response) {
    const statusCode = req.method == 'POST' ? 201 : 200;
    return this.logger.log(
      '\nREQUEST:\nMETHOD: ' +
        req.method +
        '\nPATH: ' +
        req.url +
        '\nBODY: ' +
        JSON.stringify(req.body) +
        '\nRESPONSE: \nSTATUS: ' +
        `${statusCode}` +
        '\nBODY: ' +
        JSON.stringify(res),
    );
  }

  debug(ctx: ExecutionContext) {
    return this.logger.debug(ctx.getClass());
  }

  private warn(req: Request, warn: Error, statusCode: number) {
    this.logger.warn(
      '\nREQUEST:\nMETHOD: ' +
        req.method +
        '\nPATH: ' +
        req.url +
        '\nBODY: ' +
        JSON.stringify(req.body) +
        '\nEXCEPTION: \nSTATUS: ' +
        `${statusCode}` +
        '\nBODY: ' +
        warn.message,
    );
  }

  private error(req: Request, error: Error) {
    return this.logger.error(
      '\nREQUEST:\nMETHOD: ' +
        req.method +
        '\nPATH: ' +
        req.url +
        '\nBODY: ' +
        JSON.stringify(req.body) +
        '\nERROR: \nSTATUS: 500' +
        '\nBODY: ' +
        error,
    );
  }

  fatal(req: Request, error: Error) {
    return this.logger.fatal(
      '\nREQUEST:\nMETHOD: ' +
        req.method +
        '\nPATH: ' +
        req.url +
        '\nBODY: ' +
        JSON.stringify(req.body) +
        '\nERROR: \nSTATUS: 404' +
        '\nBODY: ' +
        error.message,
    );
  }

  warnOrError(req: Request, message: Error) {
    if (message.message == 'Provided data is not valid') {
      this.warn(req, message, 400);
    } else {
      this.error(req, message);
    }
  }
}
