import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {LoginModel} from '../login.model';
import {HttpClient} from '@angular/common/http';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  faSortDown = faSortDown;
  loginList: LoginModel[];

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit() {
    this.loginList = this.adminService.logins;
  }

  // revertUsernameSort() {
  //   this.loginList = this.adminService.logins.sort(function(a, b) {
  //     if (a.user.username < b.user.username) { return -1; }
  //     if (a.user.username > b.user.username) { return 1; }
  //     return 0;
  //   }).reverse();
  // }

  revertDateSort() {
    this.loginList = this.adminService.logins.reverse();
  }

}
