import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  faAt,
  faCoffee,
  faCogs,
  faHandshake,
  faHistory,
  faSatelliteDish, faSignOutAlt, faSolarPanel,
  faUser,
  faUsers,
  faWallet
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  activeTab = 'trade';
  @Output() tabSelected = new EventEmitter<string>();

  faCoffee = faCoffee; faUsers = faUsers; faSignOutAlt = faSignOutAlt;
  faHandshake = faHandshake; faHistory = faHistory; faWallet = faWallet; faCogs = faCogs;
  faSatelliteDish = faSatelliteDish; faSolarPanel = faSolarPanel;  faUser = faUser;

  constructor() { }

  ngOnInit() {
  }

  onSelect(tab: string) {
    this.tabSelected.emit(tab);
    this.activeTab = tab;
  }
}
