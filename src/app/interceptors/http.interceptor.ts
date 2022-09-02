import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, last, retry, refCount, publishReplay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { ApiError } from '../models/shared.models';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public logger: NGXLogger, public authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = this.authService.getAccessToken();

    //console.log(request.headers);

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    let isUpload = false;
    if (request.urlWithParams.toLowerCase().indexOf("upload")) {
      isUpload = true;
    }

    //console.log('upload:' + isUpload);

    if (!request.headers.has('Content-Type') && isUpload === false) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    //console.log('before: ' + request.urlWithParams);

    let url = "";
    if (request.urlWithParams.startsWith("http") ||
      request.urlWithParams.startsWith("/assets/")) {
      url = request.urlWithParams;
    }
    else {
      url = environment.API_URL + request.urlWithParams;
    }

    console.log(url);
    request = request.clone(
      {
        headers: request.headers
          .set('Accept', 'application/json')
          .set("locale", localStorage.getItem("locale") ?? "en")
          .set("version", "1")
          .set('timeout', (environment.API_TIME_OUT_IN_SEC * 1000).toString()
          ),
        url: url
      }
    );


    //console.log(request.headers);

    return next.handle(request).pipe(
      /*
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          //console.log('event--->>>', event);
          // this.errorDialogService.openDialog(event);
        }
        return event;
      }), */
      publishReplay(),
      refCount(),
      catchError((error: HttpErrorResponse) => {
        //console.log(error.error);
        let data = {};
        data = {
          reason: error && error.error &&
            error.error.reason ? error.error.reason : '',
          status: error.status
        };

        let errMsg = error.message;
        if (error.error) {
          console.log(error.error);
          if (error.error.hasOwnProperty('message')) {
            errMsg = error.error["message"];
          }

          if (error.error.hasOwnProperty('errors')) {

            console.log(error.error["errors"]["$values"]);
            for (const v in error.error["errors"]["$values"]) {
              console.log(v);
              errMsg += " " + error.error["errors"]["$values"][v]["errorMessage"];
            }
          }
        }

        this.logger.error(error);
        return throwError(errMsg);
      }));

  }
}
