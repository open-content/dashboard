import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionService } from './auth/session.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private session: SessionService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.session.token}`
      }
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if(event instanceof HttpResponse) {
        const _token: string = event.headers.get('Authorization');

        if(_token) {
          this.session.token = _token;
        }
      }
    }, (error: any) => {
      if(error instanceof HttpErrorResponse) {
        if(error.status === 401) {
          this.session.logout()
        }
      }
    }));
  }
}
