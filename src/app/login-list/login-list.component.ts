import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {faSortAlphaDown, faSortNumericUp, faSortNumericDown, faSortAlphaUp, faSortAmountDown, faSortAmountUp} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.css']
})
export class LoginListComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  sortByIdIcon = faSortNumericDown;

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.fetchLogins();
  }

  sortByName() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.adminService.logins.sort((a, b) =>
        a.user.username.localeCompare(b.user.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.adminService.logins.sort((a, b) =>
        b.user.username.localeCompare(a.user.username));
    }
  }

  sortById() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.adminService.logins.sort((a, b) =>
        a.user.username.localeCompare(b.user.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.adminService.logins.sort((a, b) =>
        b.user.username.localeCompare(a.user.username));
    }
  }

  sortByDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.adminService.logins.sort((a, b) =>
        new Date(a.create_date).getTime() - (new Date(b.create_date).getTime()));
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.adminService.logins.sort((a, b) =>
        new Date(b.create_date).getTime() - (new Date(a.create_date).getTime()));
    }
  }

}
