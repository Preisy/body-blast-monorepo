import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppLoggerService } from '../app-logger.service';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor {
  constructor(private logger: AppLoggerService) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        this.logger.info(req, data);
        return data;
      }),
      catchError((error) => {
        if (error instanceof InternalServerErrorException) {
          this.logger.error(req, error);
        } else {
          this.logger.warn(req, error);
        }
        return throwError(() => error);
      }),
    );
  }
}
