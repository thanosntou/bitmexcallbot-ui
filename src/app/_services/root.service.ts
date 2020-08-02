import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {Observable} from 'rxjs';
import {TenantModel} from '../_models/tenant.model';
import {UserModel} from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) {}

  fetchTenants(): Observable<TenantModel[]> {
    return this.http.get<TenantModel[]>(BaseUrl.B1 + '/api/v1/root/tenants');
  }

  fetchUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/root/users');
  }

  fetchAdminsByTenant(tenantId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/root/tenants/' + tenantId + '/admins');
  }

  fetchTradersByTenant(tenantId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/root/tenants/' + tenantId + '/traders');
  }

  fetchFollowersByTrader(traderId: number): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/root/traders/' + traderId + '/followers');
  }

  createTenant(name: string): Observable<TenantModel> {
    return this.http.post<TenantModel>(BaseUrl.B1 + '/api/v1/root/tenants', name);
  }

  deleteFollowerUser(follower: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/root/followers/' + follower.id);
  }

  deleteTraderUser(trader: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/root/traders/' + trader.id);
  }

  deleteAdminUser(admin: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/root/admins/' + admin.id);
  }

  deleteTenant(tenant: TenantModel): Observable<UserModel> {
    return this.http.delete<UserModel>(BaseUrl.B1 + '/api/v1/root/tenants/' + tenant.id);
  }
}
