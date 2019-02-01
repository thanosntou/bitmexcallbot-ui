import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faMinus} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';
import {UserModel} from '../user.model';
import {Symbol} from '../Symbol.enum';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
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
  hiddenKeys = false;
  hiddenQties = false;

  constructor(private http: HttpClient, public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSaveKeys() {
    const bearerToken = this.authService.findToken();
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    const apiKey = this.apiKeyRef.nativeElement.value;
    const apiSecret = this.apiSecretRef.nativeElement.value;

    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/keys?apiKey=' + apiKey + '&apiSecret=' + apiSecret, '', httpOptions
    ).subscribe((data: UserModel) =>
      this.authService.userDetails.user = data
    );

    this.apiKeyRef.nativeElement.value = '';
    this.apiSecretRef.nativeElement.value = '';
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

    const bearerToken = this.authService.findToken();
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=' + Symbol[symbol],
      '', httpOptions
    ).subscribe((data: UserModel) => {
      this.authService.userDetails.user = data;
      this.fixedQtyXBTUSD.nativeElement.value = '';
      this.fixedQtyETHUSD.nativeElement.value = '';
      this.fixedQtyADAXXX.nativeElement.value = '';
      this.fixedQtyBCHXXX.nativeElement.value = '';
      this.fixedQtyEOSXXX.nativeElement.value = '';
      this.fixedQtyETHXXX.nativeElement.value = '';
      this.fixedQtyLTCXXX.nativeElement.value = '';
      this.fixedQtyTRXXXX.nativeElement.value = '';
      this.fixedQtyXRPXXX.nativeElement.value = '';
      }
    );
  }

  showOrHideQties() {
    this.hiddenQties = !this.hiddenQties;
  }

  showOrHideKeys() {
    this.hiddenKeys = !this.hiddenKeys;
  }
}
