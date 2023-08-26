import { Injectable } from '@angular/core';
import { MessageService } from '../services/message.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err instanceof HttpErrorResponse &&
          err.status != 403 &&
          err.status != 401
        ) {
          this.messageService.showMessages(
            ['Something unexpected happened'],
            'Close'
          );
        }
        return throwError(() => err);
      })
    );
  }
}
