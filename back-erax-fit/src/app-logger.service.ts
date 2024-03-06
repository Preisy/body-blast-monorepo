import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private logger = new Logger('AppLogger');

  async trace(message: string) {
    this.logger.verbose(message);
  }

  info(req: Request, res: Response) {
    const statusCode = req.method == 'POST' ? 201 : 200;
    this.logger.log(
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

  async debug(message: string) {
    this.logger.debug(message);
  }

  warn(req: Request, warn?: string) {
    this.logger.warn(
      '\nREQUEST:\n\n  METHOD: ' +
        req.method +
        '\n\n  PATH: ' +
        req.url +
        '\n\n  BODY: ' +
        req.body +
        '\n\nWARNING: ' +
        warn,
    );
  }

  error(req?: Request, err?: InternalServerErrorException) {
    this.logger.error(
      '\nREQUEST:\nMETHOD: ' + req?.method + '\nPATH: ' + req?.url + '\nBODY: ' + req?.body + '\nERROR: ' + err,
    );
  }

  async fatal(message: string) {
    this.logger.fatal(message);
  }
}
