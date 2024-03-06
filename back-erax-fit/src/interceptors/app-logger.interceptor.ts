import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
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
        this.logger.debug(ctx);
        this.logger.info(req, data);
        return data;
      }),
      catchError((error) => {
        this.logger.debug(ctx);
        if (error.message == 'Entity not found') {
          this.logger.fatal(req, error);
        } else {
          this.logger.warnOrError(req, error);
        }
        return throwError(() => error);
      }),
    );
  }
}
