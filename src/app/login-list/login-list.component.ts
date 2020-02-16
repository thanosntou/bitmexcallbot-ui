import { Component, OnInit } from '@angular/core';
import {AdminService} from '../_services/admin.service';
import {faSortAlphaDown, faSortNumericDown, faSortAlphaUp, faSortAmountDown, faSortAmountUp} from '@fortawesome/free-solid-svg-icons';
import {LoginModel} from '../_models/login.model';

@Component({
  selector: 'app-login-list',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.css']
})
export class LoginListComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  sortByIdIcon = faSortNumericDown;
  logins: LoginModel[];

  constructor(public adminService: AdminService) { }

  ngOnInit() {
    this.adminService.fetchLogins().subscribe(
      (data: LoginModel[]) => this.logins = data.reverse(),
      error => console.log(JSON.stringify(error))
    );
  }

  sortByName() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.logins.sort((a, b) =>
        a.user.username.localeCompare(b.user.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.logins.sort((a, b) =>
        b.user.username.localeCompare(a.user.username));
    }
  }

  sortById() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.logins.sort((a, b) =>
        a.user.username.localeCompare(b.user.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.logins.sort((a, b) =>
        b.user.username.localeCompare(a.user.username));
    }
  }

  sortByDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.logins.sort((a, b) =>
        new Date(a.createdOn).getTime() - (new Date(b.createdOn).getTime()));
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.logins.sort((a, b) =>
        new Date(b.createdOn).getTime() - (new Date(a.createdOn).getTime()));
    }
  }

}
