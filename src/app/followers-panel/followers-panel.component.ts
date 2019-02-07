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
  followers: UserModel[];

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
    ).subscribe((data: UserModel[]) =>
      this.followers = data
    );
  }

  onEnable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions)
      .subscribe((data: UserModel) =>
        this.followers.find(follower => follower.id === id).enabled = data.enabled
      );
  }

  onDisable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.findAccessToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions)
      .subscribe((data: UserModel) =>
        this.followers.find(follower => follower.id === id).enabled = data.enabled
      );
  }

  onShowTxOf(follower: UserModel) {
    if (this.authService.isAdmin()) {
      this.txService.fetchUserTx(follower);
      this.router.navigate([ '/tx']);
    }
  }
}
