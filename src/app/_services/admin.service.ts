import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginModel } from '../_models/login.model';
import {Injectable} from '@angular/core';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from '../_models/user.model';
import {Observable} from 'rxjs';
import {HttpParamsOptions} from '@angular/common/http/src/params';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService
  ) {}

  fetchVolumes(traderName: string): Observable<{totalVolume: number, activeVolume: number}> {
    const httpParams: HttpParamsOptions = { fromObject: { trader: traderName } } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams) };
    return this.http.get<{totalVolume: number, activeVolume: number}>(BaseUrl.B1 + '/api/v1/admin/volume', options);
  }

  fetchUsersWalletBalance(traderName: string): Observable<Map<string, number>> {
    const httpParams: HttpParamsOptions = { fromObject: { trader: traderName } } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams) };
    return this.http.get<Map<string, number>>(BaseUrl.B1 + '/api/v1/admin/balances', options);
  }

  fetchFollowersWalletBalance() {
    const httpOptions = { headers: new HttpHeaders()};
    return this.http.get<Map<string, number>>(BaseUrl.B1 + '/api/v1/trader/followers/balances', httpOptions);
  }

  fetchLogins() {
    return this.http.get<LoginModel[]>(BaseUrl.B1 + '/api/v1/admin/logins');
  }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/admin/users');
  }

  deleteUser(id: number) {
    return this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/root/users/' + id);
  }

  hideUser(id: number) {
    return this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/user/hide', 'id=' + id);
  }

}
