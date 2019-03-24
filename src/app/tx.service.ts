import {Injectable} from '@angular/core';
import {TxModel} from './_model/tx.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from './_enum/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserModel} from './_model/user.model';

@Injectable()
export class TxService {
  txUser: UserModel;
  tx: TxModel[];

  constructor(private http: HttpClient,
              public authService: AuthenticationService) {}

  fetchUserTx(user: UserModel) {
    this.tx = null;
    this.txUser = null;

    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken()
    })};
    let url = '/api/v1/user/tx';
    if (user !== null) {
      url = url + '?id=' + user.id;
    }
    this.http.get<TxModel[]>(
      BaseUrl.B1 + url, httpOptions
    ).subscribe((data: TxModel[]) => {
        this.tx = data.reverse();
        this.txUser = user;
    });
  }
}
