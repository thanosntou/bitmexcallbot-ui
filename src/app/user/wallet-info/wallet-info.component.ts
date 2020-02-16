import { Component, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {AuthenticationService} from '../../_services/authentication.service';
import {ActivatedRoute, Params} from '@angular/router';
import {UserWalletModel} from '../../_models/user-wallet.model';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {
  userWallet: UserWalletModel;

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWallet(this.route.snapshot.params['id']).subscribe(
      (data: UserWalletModel) => this.userWallet = data,
      error => console.log(error)
    );
  }

}
