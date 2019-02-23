import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {AuthenticationService} from '../../authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bitmex-wallet-summary',
  templateUrl: './bitmex-wallet-summary.component.html',
  styleUrls: ['./bitmex-wallet-summary.component.css']
})
export class BitmexWalletSummaryComponent implements OnInit {

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWalletSummary(this.route.snapshot.params['id']);
  }

}
