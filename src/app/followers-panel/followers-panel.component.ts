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
import {AuthenticationService} from '../_services/authentication.service';
import {BaseUrl} from '../_enums/BaseUrl.enum';
import {UserModel} from '../_models/user.model';
import {Router} from '@angular/router';
import {AdminService} from '../_services/admin.service';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css']
})
export class FollowersPanelComponent implements OnInit {
  sortByDateIcon = faSortAmountDown;
  sortByBalanceIcon = faSortNumericDown;
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: UserModel[] = [];
  enabledFollowers: UserModel[] = [];
  disabledFollowers: UserModel[] = [];
  followersBalanceMap: Map<string, number>;
  enabledAmount = 0;
  disabledAmount = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    public adminService: AdminService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.adminService.fetchFollowersWalletBalance().subscribe(
      (data: Map<string, number>) => this.followersBalanceMap = data,
      error => console.log(JSON.stringify(error))
    );

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

  onEnable(followerId: number) {
    const params = 'followerId=' + followerId + '&status=enable';
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/trader/status?' + params, null, this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel) => {
        // let user = this.followers.find(follower => follower.id === id);
          this.disabledFollowers = this.disabledFollowers.filter(i => i.id !== followerId);
          this.enabledFollowers.push(data);
        // this.disabledAmount = this.disabledAmount - 1;
        // this.disabledAmount = this.disabledAmount + 1;
        });
  }

  onDisable(followerId: number) {
    const params = 'followerId=' + followerId + '&status=disable';
    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/trader/status?' + params, null, this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel) => {
          this.enabledFollowers = this.enabledFollowers.filter(i => i.id !== followerId);
          this.disabledFollowers.push(data);
        });
  }

  onEnableAll() {
    const params = 'status=enable';
    this.http.post<UserModel[]>(BaseUrl.B1 + '/api/v1/trader/status-all?' + params, null, this.authService.jsonHeaders())
      .subscribe(
        (data: UserModel[]) => {
          this.disabledFollowers = [];
          this.enabledFollowers = data;
        });
  }

  onDisableAll() {
    const params = 'status=disable';
    this.http.post<UserModel[]>(BaseUrl.B1 + '/api/v1/trader/status-all?' + params, null, this.authService.jsonHeaders())
      .subscribe(
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
      this.enabledFollowers.sort((a, b) =>
        new Date(a.createdOn).getTime() - (new Date(b.createdOn).getTime())
      );
    } else {
      this.sortByDateIcon = faSortAmountDown;
      this.enabledFollowers.sort((a, b) =>
        new Date(b.createdOn).getTime() - (new Date(a.createdOn).getTime()));
    }
  }

  sortByBalance() {
    if (this.sortByBalanceIcon === faSortNumericDown) {
      this.sortByBalanceIcon = faSortNumericUp;
      // this.enabledFollowers.sort((a, b) => {
      //     if (!this.adminService.usersBalanceMap[b.username]) {
      //       return -1;
      //     }
      //     return this.adminService.usersBalanceMap[a.username] - this.adminService.usersBalanceMap[b.username];
      //   }
      // );
    } else {
      this.sortByBalanceIcon = faSortNumericDown;
      // this.enabledFollowers.sort((a, b) => {
      //   if (!this.adminService.usersBalanceMap[b.username]) {
      //     return -1;
      //   }
      //   return this.adminService.usersBalanceMap[b.username] - this.adminService.usersBalanceMap[a.username];
      // });
    }
  }
}
