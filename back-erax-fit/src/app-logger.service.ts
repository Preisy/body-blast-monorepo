import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppLoggerService {
  private logger = new Logger('AppLogger');

  async trace(message: string) {
    this.logger.verbose(message);
  }

  async info(message: string) {
    this.logger.log(message);
  }

  async debug(message: string) {
    this.logger.debug(message);
  }

  async warn(message: string) {
    this.logger.warn(message);
  }

  async error(message: string) {
    this.logger.error(message);
  }

  async fatal(message: string) {
    this.logger.fatal(message);
  }
}
