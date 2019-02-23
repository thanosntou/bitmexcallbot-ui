import { Component, OnInit } from '@angular/core';
import {faSortAlphaDown, faSortAlphaUp, faSortAmountDown, faSortAmountUp} from '@fortawesome/free-solid-svg-icons';
import {AdminService} from '../admin.service';
import {UserModel} from '../_model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  sortByEmailIcon = faSortAlphaDown;

  constructor(public adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.adminService.fetchUsers();
    this.adminService.fetchTotalBalance();
  }

  onDeleteUser(user: UserModel) {
    this.adminService.deleteUser(user.id);
  }

  sortByUsername() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.adminService.users.sort((a, b) =>
        a.username.localeCompare(b.username));
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.adminService.users.sort((a, b) =>
        b.username.localeCompare(a.username));
    }
  }

  sortByEmail() {
    if (this.sortByEmailIcon === faSortAmountDown) {
      this.sortByEmailIcon = faSortAmountUp;
      this.adminService.users.sort((a, b) =>
        a.email.localeCompare(b.email));
    } else {
      this.sortByEmailIcon = faSortAmountDown;
      this.adminService.users.sort((a, b) =>
        a.email.localeCompare(b.email));
    }
  }

  sortByCreateDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.adminService.users.sort((a, b) =>
        new Date(a.create_date).getTime() - (new Date(b.create_date).getTime()));
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.adminService.users.sort((a, b) =>
        new Date(b.create_date).getTime() - (new Date(a.create_date).getTime()));
    }
  }

  onSelect(user: UserModel) {
    this.router.navigate(['/users', user.id]);
  }

}
