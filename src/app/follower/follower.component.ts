import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../user.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css'],
  providers: [UserService]
})
export class FollowerComponent implements OnInit {
  user: UserModel;

  constructor(public userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userService.findById(this.route.snapshot.params['id']);
  }

}
