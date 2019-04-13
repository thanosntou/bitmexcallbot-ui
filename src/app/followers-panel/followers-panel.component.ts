import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {
  faCheckCircle,
  faMinus,
  faSortAmountDown,
  faSortAmountUp,
  faSortNumericDown,
  faSortNumericUp
} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../_enum/BaseUrl.enum';
import {UserModel} from '../_model/user.model';
import {Router} from '@angular/router';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css'],
  providers: [AdminService]
})
export class FollowersPanelComponent implements OnInit {
  sortByDateIcon = faSortAmountDown;
  sortByBalanceIcon = faSortNumericDown;
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: UserModel[] = [];
  enabledFollowers: UserModel[] = [];
  disabledFollowers: UserModel[] = [];
  enabledAmount = 0;
  disabledAmount = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    public adminService: AdminService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.adminService.fetchFollowersWalletBalance();

    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
    })};
    this.http.get<UserModel[]>(
      BaseUrl.B1 + '/api/v1/trader/followers', httpOptions
    ).subscribe((data: UserModel[]) => {
      data.forEach(f => {
        if (f.enabled) {
          this.enabledFollowers.push(f);
          this.enabledAmount = this.enabledAmount + 1;
        } else {
          this.disabledFollowers.push(f);
          this.disabledAmount = this.disabledAmount + 1;
        }
      });
    }
    );
  }

  onEnable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/trader/status', 'followerId=' + id, httpOptions
    ).subscribe(
      (data: UserModel) => {
        // let user = this.followers.find(follower => follower.id === id);
      this.disabledFollowers = this.disabledFollowers.filter(i => i.id !== id);
      this.enabledFollowers.push(data);
        // this.disabledAmount = this.disabledAmount - 1;
        // this.disabledAmount = this.disabledAmount + 1;
      });
  }

  onDisable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/trader/status', 'followerId=' + id, httpOptions
    ).subscribe(
      (data: UserModel) => {
        this.enabledFollowers = this.enabledFollowers.filter(i => i.id !== id);
        this.disabledFollowers.push(data);
      });
  }

  onEnableAll() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })};
    this.http.post<UserModel[]>(BaseUrl.B1 + '/api/v1/trader/statusAll', 'status=enable', httpOptions
    ).subscribe(
      (data: UserModel[]) => {
        this.disabledFollowers = [];
        this.enabledFollowers = data;
      });
  }

  onDisableAll() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })};
    this.http.post<UserModel[]>(BaseUrl.B1 + '/api/v1/trader/statusAll', 'status=disable', httpOptions
    ).subscribe(
      (data: UserModel[]) => {
        this.enabledFollowers = [];
        this.disabledFollowers = data;
      });
  }

  onSelect(user: UserModel) {
    this.router.navigate(['/followers', user.id]);
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
          return this.adminService.usersBalanceMap[b.username] - this.adminService.usersBalanceMap[a.username];
        }
      );
    }
  }
}
