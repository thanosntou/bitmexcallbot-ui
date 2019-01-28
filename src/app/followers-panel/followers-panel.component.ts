import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faCheckCircle, faMinus} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css']
})
export class FollowersPanelComponent implements OnInit {
  isAdmin: boolean;
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: UserModel[];

  constructor(private http: HttpClient,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.userDetails.authorities.forEach( (auth) => {
      console.log(auth);
      if (auth.authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    this.http.get<UserModel[]>(BaseUrl.BASEURL + '/api/v1/trader/followers', httpOptions)
     .subscribe((data: UserModel[]) => this.followers = data);
  }

  onEnable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions)
      .subscribe((data: UserModel) =>
        this.followers.find(follower => follower.id === id).enabled = data.enabled
      );
  }

  onDisable(id: number) {
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': this.authService.bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', 'followerId=' + id, httpOptions)
      .subscribe((data: UserModel) =>
        this.followers.find(follower => follower.id === id).enabled = data.enabled
      );
  }
}
