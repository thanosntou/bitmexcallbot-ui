import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, CanActivateChild
} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../authentication.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin2()
      .then(
        (isAdmin: boolean) => {
          if (isAdmin) {
            return true;
          } else {
            this.router.navigate(['login']);

          }
        });
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}