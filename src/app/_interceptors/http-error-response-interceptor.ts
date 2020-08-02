import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ErrorResponseService} from '../_services/error-response.service';

@Injectable({providedIn: 'root'})
export class HttpErrorResponseInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorResponseService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.log('errorrrrrrr');
        const errorResponse = <HttpErrorResponse> error;
        this.errorService.sendMessage(errorResponse.error);
        return throwError(error.error);
      })
    );
  }
}
