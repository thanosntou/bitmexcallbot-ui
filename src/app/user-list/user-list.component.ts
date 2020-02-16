import {Component, OnInit} from '@angular/core';
import {
  faSortAlphaDown,
  faSortAlphaUp,
  faSortAmountDown,
  faSortAmountUp,
  faSortNumericUp,
  faSortNumericDown
} from '@fortawesome/free-solid-svg-icons';
import {AdminService} from '../_services/admin.service';
import {UserModel} from '../_models/user.model';
import {Router} from '@angular/router';
import {UserDetailsModel} from '../_models/user-details.model';
import {AuthenticationService} from '../_services/authentication.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userDetails: UserDetailsModel;
  sortByNameIcon = faSortAlphaDown;
  sortByDateIcon = faSortAmountDown;
  sortByEmailIcon = faSortAlphaDown;
  sortByBalanceIcon = faSortNumericDown;
  sortByIdIcon = faSortNumericDown;
  isRoot = false;
  users: UserModel[] = [];
  traders: UserModel[] = [];
  totalVolume: number;
  activeVolume: number;
  usersBalanceMap: Map<string, number>;

  constructor(private adminService: AdminService,
              private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.userDetails = this.authService.findUserDetails();
    this.authService.findUserRoles().forEach(auth => {
      if (auth.role === 'ROOT') {
        this.isRoot = true;
      }
    });
    this.fetchAndSetUsers();
  }

  onChangeTrader(event): void {
    this.fetchAndSetVolumes(event.target.value);
    this.fetchAndSetUsersWalletBalance(event.target.value);
  }

  fetchAndSetUsers() {
    this.adminService.fetchUsers().subscribe(response => {
      this.users = response;
      this.traders = this.users.filter(i => i.authorities.indexOf('TRADER') > -1);
    });
  }

  fetchAndSetVolumes(traderName: string) {
    this.adminService.fetchVolumes(traderName).subscribe(
      (data: {totalVolume: number, activeVolume: number}) => {
        this.totalVolume = data.totalVolume;
        this.activeVolume = data.activeVolume;
      },
      error => console.log(JSON.stringify(error))
    );
  }

  fetchAndSetUsersWalletBalance(traderName: string) {
    this.adminService.fetchUsersWalletBalance(traderName).subscribe(
      (data: Map<string, number>) => this.usersBalanceMap = data,
      error => console.log(JSON.stringify(error))
    );
  }

  onDeleteUser(user: UserModel) {
    this.adminService.deleteUser(user.id).subscribe(
      (data: UserModel) => {
        // this.users.splice(this.users.indexOf(data), 1);
        this.users = this.users.filter(i => i.id !== user.id);
      },
      error => console.log(JSON.stringify(error))
    );
  }

  onMakeHiddenUser(user: UserModel) {
    this.adminService.hideUser(user.id).subscribe(
      (data: UserModel) => this.users = this.users.filter(i => i.id !== user.id),
      error => console.log(JSON.stringify(error))
    );
  }

  sortByUsername() {
    if (this.sortByNameIcon === faSortAlphaDown) {
      this.sortByNameIcon = faSortAlphaUp;
      this.users.sort((a, b) =>
        a.username.localeCompare(b.username)
      );
    } else {
      this.sortByNameIcon = faSortAlphaDown;
      this.users.sort((a, b) =>
        b.username.localeCompare(a.username)
      );
    }
  }

  sortByEmail() {
    if (this.sortByEmailIcon === faSortAmountDown) {
      this.sortByEmailIcon = faSortAmountUp;
      this.users.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
    } else {
      this.sortByEmailIcon = faSortAmountDown;
      this.users.sort((a, b) =>
        a.email.localeCompare(b.email)
      );
    }
  }

  sortByCreateDate() {
    if (this.sortByDateIcon === faSortAmountDown) {
      this.sortByDateIcon = faSortAmountUp;
      this.users.sort((a, b) =>
        new Date(a.createdOn).getTime() - (new Date(b.createdOn).getTime())
      );
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.users.sort((a, b) =>
        new Date(b.createdOn).getTime() - (new Date(a.createdOn).getTime()));
    }
  }

  sortByBalance() {
    if (this.sortByBalanceIcon === faSortNumericDown) {
      this.sortByBalanceIcon = faSortNumericUp;
      this.users.sort((a, b) => {
        if (!this.usersBalanceMap[b.username]) {
          return -1;
        }
        return this.usersBalanceMap[a.username] - this.usersBalanceMap[b.username];
      }

      );
    } else {
      this.sortByBalanceIcon = faSortNumericDown;
      this.users.sort((a, b) => {
          if (!this.usersBalanceMap[b.username]) {
            return -1;
          }
          return this.usersBalanceMap[b.username] - this.usersBalanceMap[a.username];
        }
      );
    }
  }

  sortById() {
    if (this.sortByIdIcon === faSortNumericDown) {
      this.sortByIdIcon = faSortNumericUp;
      this.users.sort((a, b) =>
        a.id - b.id
      );
    } else {
      this.sortByIdIcon = faSortNumericDown;
      this.users.sort((a, b) =>
        b.id - a.id
      );
    }
  }

  onSelect(user: UserModel) {
    this.router.navigate(['/users', user.id]);
  }

}
