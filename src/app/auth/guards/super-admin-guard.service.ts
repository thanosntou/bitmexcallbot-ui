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
export class SuperAdminGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router,
              private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isSuperAdmin2()
      .then(
        (isSuperAdmin: boolean) => {
          if (isSuperAdmin) {
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
