import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';
import {UserModel} from '../user.model';
import {Symbol} from '../Symbol.enum';
import {UserDetailsModel} from '../user-details.model';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private _successPass = new Subject<string>();
  private _successKeys = new Subject<string>();
  private _successQty = new Subject<string>();
  successMessagePass: string;
  successMessageQty: string;
  successMessageKeys: string;
  @ViewChild('apiKeyInput') apiKeyRef: ElementRef;
  @ViewChild('apiSecretInput') apiSecretRef: ElementRef;
  @ViewChild('fixedQtyXBTUSD') fixedQtyXBTUSD: ElementRef;
  @ViewChild('fixedQtyETHUSD') fixedQtyETHUSD: ElementRef;
  @ViewChild('fixedQtyADAXXX') fixedQtyADAXXX: ElementRef;
  @ViewChild('fixedQtyBCHXXX') fixedQtyBCHXXX: ElementRef;
  @ViewChild('fixedQtyEOSXXX') fixedQtyEOSXXX: ElementRef;
  @ViewChild('fixedQtyETHXXX') fixedQtyETHXXX: ElementRef;
  @ViewChild('fixedQtyLTCXXX') fixedQtyLTCXXX: ElementRef;
  @ViewChild('fixedQtyTRXXXX') fixedQtyTRXXXX: ElementRef;
  @ViewChild('fixedQtyXRPXXX') fixedQtyXRPXXX: ElementRef;
  @ViewChild('clientInput') clientInput: ElementRef;
  @ViewChild('oldPass') oldPass: ElementRef;
  @ViewChild('newPass') newPass: ElementRef;
  @ViewChild('confirmPass') confirmPass: ElementRef;
  userDetailsInfo: UserDetailsModel;

  constructor(private http: HttpClient, public authService: AuthenticationService) { }

  ngOnInit() {
    this.userDetailsInfo = this.authService.findUserDetails();
    this._successPass.subscribe((message) => this.successMessagePass = message);
    this._successPass.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessagePass = null);
    this._successKeys.subscribe((message) => this.successMessageKeys = message);
    this._successKeys.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessageKeys = null);
    this._successQty.subscribe((message) => this.successMessageQty = message);
    this._successQty.pipe(
      debounceTime(1000)
    ).subscribe(() => this.successMessageQty = null);
  }

  onSaveKeys() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const apiKey = this.apiKeyRef.nativeElement.value;
    const apiSecret = this.apiSecretRef.nativeElement.value;
    const body = 'apiKey=' + apiKey + '&apiSecret=' + apiSecret;
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/keys', body, httpOptions
    ).subscribe((data: UserModel) => {
      this.userDetailsInfo.user = data;
      this.authService.refreshUser(data);
      this._successKeys.next('API Keys saved');
      this.apiKeyRef.nativeElement.value = '';
      this.apiSecretRef.nativeElement.value = '';
    });
  }

  onSavePass() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const oldPass = this.oldPass.nativeElement.value;
    const newPass = this.newPass.nativeElement.value;
    const confirmPass = this.confirmPass.nativeElement.value;
    const body = 'oldPass=' + oldPass + '&newPass=' + newPass + '&confirmPass=' + confirmPass;
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/pass', body, httpOptions
    ).subscribe((data: UserModel) => {
      this.userDetailsInfo.user = data;
      this.authService.refreshUser(data);
      this._successPass.next('Password changed');
      this.oldPass.nativeElement.value = '';
      this.newPass.nativeElement.value = '';
      this.confirmPass.nativeElement.value = '';
    });
  }

  onSavefixedQty(symbol: string) {
    let qty;
    if (Symbol.XBTUSD === Symbol[symbol]) {
      qty = this.fixedQtyXBTUSD.nativeElement.value;
    } else if (Symbol.ETHUSD === Symbol[symbol]) {
      qty = this.fixedQtyETHUSD.nativeElement.value;
    } else if (Symbol.ADAXXX === Symbol[symbol]) {
      qty = this.fixedQtyADAXXX.nativeElement.value;
    } else if (Symbol.BCHXXX === Symbol[symbol]) {
      qty = this.fixedQtyBCHXXX.nativeElement.value;
    } else if (Symbol.EOSXXX === Symbol[symbol]) {
      qty = this.fixedQtyEOSXXX.nativeElement.value;
    } else if (Symbol.ETHXXX === Symbol[symbol]) {
      qty = this.fixedQtyETHXXX.nativeElement.value;
    } else if (Symbol.LTCXXX === Symbol[symbol]) {
      qty = this.fixedQtyLTCXXX.nativeElement.value;
    } else if (Symbol.TRXXXX === Symbol[symbol]) {
      qty = this.fixedQtyTRXXXX.nativeElement.value;
    } else if (Symbol.XRPXXX === Symbol[symbol]) {
      qty = this.fixedQtyXRPXXX.nativeElement.value;
    }
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=' + Symbol[symbol], '', httpOptions
    ).subscribe((data: UserModel) => {
      this.userDetailsInfo.user = data;
      this.authService.refreshUser(data);
      this._successQty.next('Quantity saved');
      this.fixedQtyXBTUSD.nativeElement.value = '';
      this.fixedQtyETHUSD.nativeElement.value = '';
      this.fixedQtyADAXXX.nativeElement.value = '';
      this.fixedQtyBCHXXX.nativeElement.value = '';
      this.fixedQtyEOSXXX.nativeElement.value = '';
      this.fixedQtyETHXXX.nativeElement.value = '';
      this.fixedQtyLTCXXX.nativeElement.value = '';
      this.fixedQtyTRXXXX.nativeElement.value = '';
      this.fixedQtyXRPXXX.nativeElement.value = '';
    });
  }

  onChangeClient() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const body = 'client=' + this.clientInput.nativeElement.value;
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/client', body, httpOptions
    ).subscribe((data: UserModel) => {
      this.userDetailsInfo.user = data;
      this.authService.refreshUser(data);
    });
  }
}
