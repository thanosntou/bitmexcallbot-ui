import { Component, OnInit } from '@angular/core';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
  faSortNumericUp,
  faSortNumericDown
} from '@fortawesome/free-solid-svg-icons';
import {AdminService} from '../admin.service';
import {UserModel} from '../_model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [AdminService]
})
export class UserListComponent implements OnInit {
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  sortByEmailIcon = faSortAlphaDown;
  sortByBalanceIcon = faSortNumericDown;
  sortByIdIcon = faSortNumericDown;

  constructor(public adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
    this.adminService.fetchUsers();
    this.adminService.fetchVolumes();
    this.adminService.fetchUsersWalletBalance();
  }

  onDeleteUser(user: UserModel) {
    this.adminService.deleteUser(user.id);
  }

  onMakeHiddenUser(user: UserModel) {
    this.adminService.hideUser(user.id);
  }

  sortByUsername() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.adminService.users.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.adminService.users.sort((a, b) =>
        b.username.localeCompare(a.username)
      );
    }
  }

  sortByEmail() {
    if (this.sortByEmailIcon === faSortAmountDown) {
      this.sortByEmailIcon = faSortAmountUp;
      this.adminService.users.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
    } else {
      this.sortByEmailIcon = faSortAmountDown;
      this.adminService.users.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
    }
  }

  sortByCreateDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.adminService.users.sort((a, b) =>
        new Date(a.create_date).getTime() - (new Date(b.create_date).getTime())
      );
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.adminService.users.sort((a, b) =>
        new Date(b.create_date).getTime() - (new Date(a.create_date).getTime()));
    }
  }

  sortByBalance() {
    if (this.sortByBalanceIcon === faSortNumericDown) {
      this.sortByBalanceIcon = faSortNumericUp;
      this.adminService.users.sort((a, b) => {
        if (!this.adminService.usersBalanceMap[b.username]) {
          return -1;
        }
        return this.adminService.usersBalanceMap[a.username] - this.adminService.usersBalanceMap[b.username];
      }

      );
    } else {
      this.sortByBalanceIcon = faSortNumericDown;
      this.adminService.users.sort((a, b) => {
          if (!this.adminService.usersBalanceMap[b.username]) {
            return -1;
          }
          return this.adminService.usersBalanceMap[a.username] - this.adminService.usersBalanceMap[b.username];
        }
      );
    }
  }

  sortById() {
    if (this.sortByIdIcon === faSortNumericDown) {
      this.sortByIdIcon = faSortNumericUp;
      this.adminService.users.sort((a, b) =>
        a.id - b.id
      );
    } else {
      this.sortByIdIcon = faSortNumericDown;
      this.adminService.users.sort((a, b) =>
        b.id - a.id
      );
    }
  }

  onSelect(user: UserModel) {
    this.router.navigate(['/users', user.id]);
  }

}
