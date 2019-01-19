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
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: UserModel[];

  constructor(private http: HttpClient, public authService: AuthenticationService) { }

  ngOnInit() {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

   this.http.get<UserModel[]>(BaseUrl.BASEURL + '/api/v1/trader/followers', httpOptions)
     .subscribe((data: UserModel[]) => this.followers = data);
  }

  onEnable(id: number) {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    const body = 'followerId=' + id;

    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', body, httpOptions)
      .subscribe((data: UserModel) => {
        // const fol = this.followers.find(follower => follower.id === data.id);
        // fol.enabled = data.enabled;
        // this.followers.push(fol);
      });

    this.followers.find(follower => follower.id === id).enabled = true;
  }

  onDisable(id: number) {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
    })};

    const body = 'followerId=' + id;

    this.http.post<UserModel>(BaseUrl.BASEURL + '/api/v1/trader/status', body, httpOptions)
      .subscribe((data: UserModel) => {
        // const fol = this.followers.find(follower => follower.id === data.id);
        // fol.enabled = data.enabled;
        // this.followers.push(fol);
      });

    this.followers.find(follower => follower.id === id).enabled = false;

  }
}
