import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {ActiveOrdersService} from '../trade-panel/active-orders.service';
import {OpenPositionsService} from '../trade-panel/open-positions.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService, ActiveOrdersService, OpenPositionsService]
})
export class UserComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  constructor(public userService: UserService,
              public authService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.findById(this.route.snapshot.params['id']);
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
          this.userService.findById(params['id']);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
