import {Injectable} from '@angular/core';
import {TxModel} from './tx.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from './BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class TxService {
  txUser: UserModel;
  tx: TxModel[];


  constructor(private http: HttpClient, public authService: AuthenticationService) {
  }

  fetchUserTx(user: UserModel) {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        // 'Content-Type': 'application/x-www-form-urlencoded'
    })};

    let url = '/api/v1/user/tx';
    if (user !== null) {
      url = url + '?id=' + user.id;
    }

    this.http.get<TxModel[]>(BaseUrl.BASEURL + url, httpOptions)
      .subscribe((data: TxModel[]) => {
        this.tx = data.reverse();
        this.txUser = user;
      });
  }


}
