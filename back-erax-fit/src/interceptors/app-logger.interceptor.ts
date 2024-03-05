import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppLoggerService } from '../app-logger.service';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor {
  constructor(@Inject('LOGGER') private logger: AppLoggerService) {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {}),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
