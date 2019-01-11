import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FollowerModel} from '../followers-panel/follower.model';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {faMinus} from '@fortawesome/free-solid-svg-icons';
import { LoggingService } from '../logging.service';

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
  @ViewChild('fixedQtyADAZ18') fixedQtyADAZ18: ElementRef;
  @ViewChild('fixedQtyBCHZ18') fixedQtyBCHZ18: ElementRef;
  @ViewChild('fixedQtyEOSZ18') fixedQtyEOSZ18: ElementRef;
  @ViewChild('fixedQtyETHZ18') fixedQtyETHZ18: ElementRef;
  @ViewChild('fixedQtyLTCZ18') fixedQtyLTCZ18: ElementRef;
  @ViewChild('fixedQtyTRXZ18') fixedQtyTRXZ18: ElementRef;
  @ViewChild('fixedQtyXRPZ18') fixedQtyXRPZ18: ElementRef;
  user: FollowerModel;
  hiddenKeys = false;
  hiddenQties = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<FollowerModel>('http://localhost:8082/BioUnion/api/v1/user')
      .subscribe((data: FollowerModel) => {
        this.user = data;
      });
  }

  onSaveKeys() {
    const apiKey = this.apiKeyRef.nativeElement.value;
    const apiSecret = this.apiSecretRef.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/keys?apiKey=' + apiKey + '&apiSecret=' + apiSecret,
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.apiKeyRef.nativeElement.value = '';
    this.apiSecretRef.nativeElement.value = '';

    const logService = new LoggingService();
    logService.logStatusChange(this.user.email);
  }

  onSavefixedQtyXBTUSD() {
    const qty = this.fixedQtyXBTUSD.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=XBTUSD',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyXBTUSD.nativeElement.value = '';
  }
  onSavefixedQtyETHUSD() {
    const qty = this.fixedQtyETHUSD.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=ETHUSD',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyETHUSD.nativeElement.value = '';
  }
  onSavefixedQtyADA() {
    const qty = this.fixedQtyADAZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=ADAZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyADAZ18.nativeElement.value = '';
  }
  onSavefixedQtyBCH() {
    const qty = this.fixedQtyBCHZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=BCHZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyBCHZ18.nativeElement.value = '';
  }
  onSavefixedQtyEOS() {
    const qty = this.fixedQtyEOSZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=EOSZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.apiKeyRef.nativeElement.value = '';
  }
  onSavefixedQtyETH() {
    const qty = this.fixedQtyETHZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=ETHZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyETHZ18.nativeElement.value = '';
  }
  onSavefixedQtyLTC() {
    const qty = this.fixedQtyLTCZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=LTCZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyLTCZ18.nativeElement.value = '';
  }
  onSavefixedQtyTRX() {
    const qty = this.fixedQtyTRXZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=TRXZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyTRXZ18.nativeElement.value = '';
  }
  onSavefixedQtyXRP() {
    const qty = this.fixedQtyXRPZ18.nativeElement.value;

    this.http.post<FollowerModel>(
      'http://localhost:8082/BioUnion/api/v1/user/fixedQty?fixedQty=' + qty + '&symbol=XRPZ18',
      '')
      .subscribe((data: FollowerModel) => this.user = data);
    console.log(this.user);
    this.fixedQtyXRPZ18.nativeElement.value = '';
  }
    // const apiKey = this.apiKeyRef.nativeElement.value;
    // const apiSecret = this.apiSecretRef.nativeElement.value;
    //
    // this.http.post<FollowerModel>(
    //   'http://localhost:8082/BioUnion/api/v1/user/keys?apiKey=' + apiKey + '&apiSecret=' + apiSecret,
    //   '')
    //   .subscribe((data: FollowerModel) => this.user = data);
    // console.log(this.user);
    // this.apiKeyRef.nativeElement.value = '';
    // this.apiSecretRef.nativeElement.value = '';

  showOrHideQties() {
    this.hiddenQties = !this.hiddenQties;
  }

  showOrHideKeys() {
    this.hiddenKeys = !this.hiddenKeys;
  }

}
