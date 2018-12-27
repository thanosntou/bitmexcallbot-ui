import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Follower} from './follower.model';
import {Follower2} from './Follower2';
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
  followers: Follower[] = [
    new Follower('botaki1', 'otinane@mail.com'),
    new Follower('botaki2', 'denkserw@mail.com')
  ];

  followers2: Follower2[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
   this.http.get<Follower[]>('https://www.bitmexcallbot.com/api/v1/trader/followers')
     .subscribe((data: Follower2[]) => this.followers2 = data);
   console.log('Followers list fetched');
  }
}
