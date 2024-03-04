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
        const response = context.switchToHttp().getResponse();
        const now = Date.now();
        this.logger.log(
          '\n\n====================================================\n\nTIME: ' +
            Date().toString() +
            '\nMETHOD: ' +
            JSON.stringify(request.method) +
            '\nPATH:' +
            JSON.stringify(request.url) +
            '\nBODY: ' +
            JSON.stringify(request.body) +
            '\nRESPONSE: ' +
            '\n   RESPONSE TIME: ' +
            `${Date.now() - now} ms` +
            '\n   STATUS CODE: ' +
            JSON.stringify(response.statusCode) +
            '\n   STATUS: ' +
            JSON.stringify(response.status) +
            '\n   BODY: ' +
            JSON.stringify(response.body),
        );
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const now = Date.now();
        this.logger.log(
          '\n\n====================================================\n\nTIME: ' +
            Date().toString() +
            '\nMETHOD: ' +
            JSON.stringify(request.method) +
            '\nPATH:' +
            JSON.stringify(request.url) +
            '\nBODY: ' +
            JSON.stringify(request.body) +
            '\nRESPONSE: ' +
            '\n   RESPONSE TIME: ' +
            `${Date.now() - now} ms` +
            '\n   STATUS CODE: ' +
            JSON.stringify(response.statusCode) +
            '\n   STATUS: ' +
            JSON.stringify(response.status) +
            '\n   BODY: ' +
            JSON.stringify(response.body),
        );
        return throwError(() => error);
      }),
    );
  }
}
