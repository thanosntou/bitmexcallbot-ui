import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faCheckCircle, faMinus} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';
import {UserModel} from '../user.model';
import {TxService} from '../tx.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css']
})
export class FollowersPanelComponent implements OnInit {
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: UserModel[] = [];
  enabledFollowers: UserModel[] = [];
  disabledFollowers: UserModel[] = [];
  enabledAmount = 0;
  disabledAmount = 0;

  constructor(private http: HttpClient,
              public authService: AuthenticationService,
              private txService: TxService,
              private router: Router) { }

  ngOnInit() {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
    })};
    this.http.get<UserModel[]>(
      BaseUrl.BASEURL + '/api/v1/trader/followers', httpOptions
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
    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions
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
    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions
    ).subscribe(
      (data: UserModel) => {
        this.enabledFollowers = this.enabledFollowers.filter(i => i.id !== id);
        this.disabledFollowers.push(data);
      });
  }

  onShowTxOf(follower: UserModel) {
    if (this.authService.isAdmin()) {
      this.txService.fetchUserTx(follower);
      this.router.navigate([ '/tx']);
    }
  }

  onSelect(user: UserModel) {
    this.router.navigate(['/followers', user.id]);
  }
}
