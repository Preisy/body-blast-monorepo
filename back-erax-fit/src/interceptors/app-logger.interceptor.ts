import { Injectable, NestInterceptor, ExecutionContext, Logger, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AppLoggerInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getRequest();
        this.logger.log(
          '\n\n====================================================\n\nTIME: ' +
            Date().toString() +
            '\nMETHOD: ' +
            JSON.stringify(request.method) +
            '\nBODY: ' +
            JSON.stringify(request.body) +
            '\nRESPONSE: ' +
            JSON.stringify(response.statusCode) +
            ' / ' +
            JSON.stringify(response.status) +
            ' / ' +
            JSON.stringify(response.body),
        );
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        console.error(`${response.statusCode} | [${response.method}]`);
        return throwError(error);
      }),
    );
  }
}
