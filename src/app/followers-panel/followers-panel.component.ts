import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FollowerModel } from './follower.model';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-followers-panel',
  templateUrl: './followers-panel.component.html',
  styleUrls: ['./followers-panel.component.css']
})
export class FollowersPanelComponent implements OnInit {
  faCheckedCircle = faCheckCircle;
  faMinus = faMinus;
  followers: FollowerModel[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
   this.http.get<FollowerModel[]>('https://www.bitmexcallbot.com/api/v1/trader/followers')
     .subscribe((data: FollowerModel[]) => this.followers = data);
   console.log('Followers list fetched');
  }
}
