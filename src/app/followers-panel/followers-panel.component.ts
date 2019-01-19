import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FollowerModel } from './follower.model';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {BaseUrl} from '../BaseUrl.enum';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css']
})
export class FollowersPanelComponent implements OnInit {
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: FollowerModel[];

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
    const bearerToken = this.authService.accessToken.token_type + ' ' + this.authService.accessToken.access_token;
    const httpOptions = { headers: new HttpHeaders({
        'Authorization': bearerToken,
        'Content-Type': 'application/x-www-form-urlencoded'
      })};

   this.http.get<FollowerModel[]>(BaseUrl.BASEURL + '/api/v1/trader/followers', httpOptions)
     .subscribe((data: FollowerModel[]) => this.followers = data);
   console.log('Followers list fetched');
  }
}
