import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public logger: NGXLogger) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errMsg = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }

          this.logger.error(errMsg);
         // window.alert(errMsg);
          return throwError(errMsg);
        })
      )
  }
}
