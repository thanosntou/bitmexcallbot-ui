import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
  faAt = faAt;
  faNewspaper = faNewspaper;
  faUsers = faUsers;
  faUser = faUser;
  faHandshake = faHandshake;
  faHistory = faHistory;
  faWallet = faWallet;
  faCogs = faCogs;
  faSatelliteDish = faSatelliteDish;
  faSolarPanel = faSolarPanel;
  faSignOutAlt = faSignOutAlt;
  activeNews = false;
  activeDashboard = false;
  activeFollow = false;
  activeFollowers = false;
  activeTradePanel = false;
  activeTX = true;
  activeWallet = false;
  activeSettings = false;
  activeAdminPanel = false;

  showNews() {
    this.deactivateSidebarTabs();
    this.activeNews = true;
  }
  showDashboard() {
    this.deactivateSidebarTabs();
    this.activeDashboard = true;
  }
  showFollow() {
    this.deactivateSidebarTabs();
    this.activeFollow = true;
  }
  showFollowers() {
    this.deactivateSidebarTabs();
    this.activeFollowers = true;
  }
  showTX() {
    this.deactivateSidebarTabs();
    this.activeTX = true;
  }
  showWallet() {
    this.deactivateSidebarTabs();
    this.activeWallet = true;
  }
  showTrade() {
    this.deactivateSidebarTabs();
    this.activeTradePanel = true;
  }
  showSettings() {
    this.deactivateSidebarTabs();
    this.activeSettings = true;
  }
  showAdmin() {
    this.deactivateSidebarTabs();
    this.activeAdminPanel = true;
  }

  hideOrAppear1() {
    this.hidden1 = !this.hidden1;
  }

  hideOrAppear2() {
    this.hidden2 = !this.hidden2;
  }

  hideOrAppear3() {
    this.hidden3 = !this.hidden3;
  }
  deactivateSidebarTabs() {
    this.activeNews = false;
    this.activeDashboard = false;
    this.activeFollow = false;
    this.activeFollowers = false;
    this.activeTradePanel = false;
    this.activeTX = false;
    this.activeSettings = false;
    this.activeWallet = false;
    this.activeAdminPanel = false;
  }
}
