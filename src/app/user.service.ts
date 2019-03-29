import {UserModel} from './_model/user.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from './_enum/BaseUrl.enum';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';
import {UserWalletModel} from './_model/user-wallet.model';
import {BitmexTransactionModel} from './bitmex-transaction.model';

@Injectable()
export class UserService {
  user: UserModel;
  userWallet: UserWalletModel;
  bitmexTransactions: BitmexTransactionModel[] = [];
  bitmexTransactionsSummary: BitmexTransactionModel[] = [];

  constructor(private authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {}

  findById(id: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.get<UserModel>(
      BaseUrl.B1 + '/api/v1/user?id=' + id, httpOptions
    ).subscribe(
      (data: UserModel) => this.user = data,
      error => console.log(error)
    );
  }

  fetchWallet(id: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.get<UserWalletModel>(
      BaseUrl.B1 + '/api/v1/follower/wallet?id=' + id, httpOptions
    ).subscribe(
      (data: UserWalletModel) => this.userWallet = data,
      error => console.log(error)
    );
  }

  fetchWalletHistory(id: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.get<BitmexTransactionModel[]>(
      BaseUrl.B1 + '/api/v1/follower/wallet/history?id=' + id, httpOptions
    ).subscribe(
      (data: BitmexTransactionModel[]) => this.bitmexTransactions = data,
      error => console.log(error)
    );
  }

  fetchWalletSummary(id: number) {
    const httpOptions = {headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.get<BitmexTransactionModel[]>(
      BaseUrl.B1 + '/api/v1/follower/wallet/summary?id=' + id, httpOptions
    ).subscribe(
      (data: BitmexTransactionModel[]) => this.bitmexTransactionsSummary = data,
      error => console.log(error)
    );
  }
}
