import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {UserDetailsModel} from '../../_models/user-details.model';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../_services/authentication.service';
import {debounceTime} from 'rxjs/operators';
import {UserModel} from '../../_models/user.model';
import {BaseUrl} from '../../_enums/BaseUrl.enum';
import {Symbol} from '../../_enums/Symbol.enum';

@Component({
  selector: 'app-follower-settings',
  templateUrl: './follower-settings.component.html',
  styleUrls: ['./follower-settings.component.css']
})
export class FollowerSettingsComponent implements OnInit {
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

  constructor(private http: HttpClient,
              public authService: AuthenticationService
  ) { }

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
    const body = {
      apiKey:  this.apiKeyRef.nativeElement.value,
      apiSecret: this.apiSecretRef.nativeElement.value
    };
    this.http.put<UserModel>(BaseUrl.B1 + '/api/v1/follower', body, this.authService.jsonHeaders())
      .subscribe((data: UserModel) => {
        this.userDetailsInfo.user = data;
        this.authService.refreshUser(data);
        this._successKeys.next('API Keys saved');
        this.apiKeyRef.nativeElement.value = '';
        this.apiSecretRef.nativeElement.value = '';
      });
  }

  onSavePass() {
    const body = {
      oldPass:  this.oldPass.nativeElement.value,
      newPass: this.newPass.nativeElement.value,
      confirmPass: this.confirmPass.nativeElement.value
    };
    this.http.put<UserModel>(BaseUrl.B1 + '/api/v1/user/pass', body, this.authService.jsonHeaders())
      .subscribe((data: UserModel) => {
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
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=' + Symbol[symbol], null, this.authService.jsonHeaders())
      .subscribe((data: UserModel) => {
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
    const body = {
      client:  this.clientInput.nativeElement.value
    };
    this.http.put<UserModel>(BaseUrl.B1 + '/api/v1/follower', body, this.authService.jsonHeaders())
      .subscribe((data: UserModel) => {
        this.userDetailsInfo.user = data;
        this.authService.refreshUser(data);
      });
  }
}
