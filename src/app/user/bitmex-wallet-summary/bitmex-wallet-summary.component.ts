import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute} from '@angular/router';
import {BitmexTransactionModel} from '../../_models/bitmex-transaction.model';

@Component({
  selector: 'app-bitmex-wallet-summary',
  templateUrl: './bitmex-wallet-summary.component.html',
  styleUrls: ['./bitmex-wallet-summary.component.css']
})
export class BitmexWalletSummaryComponent implements OnInit {
  bitmexTransactionsSummary: BitmexTransactionModel[] = [];

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWalletSummary(this.route.snapshot.params['id']).subscribe(
      (data: BitmexTransactionModel[]) => this.bitmexTransactionsSummary = data,
      error => console.log(error)
    );
  }

}
