import {UserModel} from '../_models/user.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {UserWalletModel} from '../_models/user-wallet.model';
import {BitmexTransactionModel} from '../_models/bitmex-transaction.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {}

  findById(id: number) {
    return this.http.get<UserModel>(BaseUrl.B1 + '/api/v1/user?id=' + id, this.authService.jsonHeaders());
  }

  fetchWallet(id: number) {
    return this.http.get<UserWalletModel>(BaseUrl.B1 + '/api/v1/customer/wallet?id=' + id, this.authService.jsonHeaders());
  }

  fetchWalletHistory(id: number) {
    return this.http.get<BitmexTransactionModel[]>(BaseUrl.B1 + '/api/v1/customer/wallet/history?id=' + id, this.authService.jsonHeaders());
  }

  fetchWalletSummary(id: number) {
    return this.http.get<BitmexTransactionModel[]>(BaseUrl.B1 + '/api/v1/customer/wallet/summary?id=' + id, this.authService.jsonHeaders());
  }
}
