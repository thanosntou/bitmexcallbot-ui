import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from '../_models/user.model';
import {BaseUrl} from '../_enums/BaseUrl.enum';

@Injectable({
  providedIn: 'root'
})
export class TraderService {

  constructor(private http: HttpClient) {}

  fetchGuideFollower(): Observable<UserModel> {
    return this.http.get<UserModel>(BaseUrl.B1 + '/api/v1/trader/followers/guide');
  }

  fetchFollowers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(BaseUrl.B1 + '/api/v1/trader/followers');
  }
}
