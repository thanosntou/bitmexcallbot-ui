import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  AUTHORIZATION = 'Authorization';

  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this check is done for the case of the login call, that already have Basic auth
    if (req.headers.get(this.AUTHORIZATION)) {
      return next.handle(req);
    } else {
      const accessToken = this.authService.findAccessToken();
      const modifiedRequest = req.clone({headers: req.headers.append(this.AUTHORIZATION, accessToken)});
      return next.handle(modifiedRequest);
    }
  }
}
