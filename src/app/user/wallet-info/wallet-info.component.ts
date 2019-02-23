import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {AuthenticationService} from '../../authentication.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWallet(this.route.snapshot.params['id']);
  }

}
