import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../_services/user.service';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {UserModel} from '../_models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: UserModel;
  paramsSubscription: Subscription;

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.findById(this.route.snapshot.params['id']).subscribe(
      (data: UserModel) => this.user = data,
      error => console.log(error)
    );
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
          this.userService.findById(params['id']);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
