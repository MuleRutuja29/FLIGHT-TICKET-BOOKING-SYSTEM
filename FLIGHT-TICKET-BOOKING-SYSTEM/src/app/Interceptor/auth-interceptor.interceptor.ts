import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogsService } from '../Auth Guard/Services/logs.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  token:any;

  constructor(private userService:LogsService) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = this.userService.getToken();
    console.log(this.token);
    if (this.token) {
      console.log("interceptor");
      request = request.clone({
        setHeaders: {
          Authorization: this.token
        }
      });
    }
    return next.handle(request);

  }
}
