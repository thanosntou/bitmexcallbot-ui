import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
import {AuthenticationService} from '../../authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bitmex-wallet-history',
  templateUrl: './bitmex-wallet-history.component.html',
  styleUrls: ['./bitmex-wallet-history.component.css']
})
export class BitmexWalletHistoryComponent implements OnInit {

  constructor(public userService: UserService,
              public authService: AuthenticationService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.fetchWalletHistory(this.route.snapshot.params['id']);
  }

}
