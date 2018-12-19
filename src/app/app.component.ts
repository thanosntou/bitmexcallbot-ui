import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitmexcallbot-ui';
  hidden1 = false;
  hidden2 = false;
  hidden3 = false;
  faCoffee = faCoffee;
  faNewspaper = faNewspaper;
  faUsers = faUsers;
  faHandshake = faHandshake;
  faHistory = faHistory;
  faWallet = faWallet;
  faCogs = faCogs;
  faSatelliteDish = faSatelliteDish;
  faSolarPanel = faSolarPanel;

  hideOrAppear1() {
    this.hidden1 = !this.hidden1;
  }

  hideOrAppear2() {
    this.hidden2 = !this.hidden2;
  }

  hideOrAppear3() {
    this.hidden3 = !this.hidden3;
  }
}
