import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  faCoffee,
  faCogs,
  faHandshake,
  faHistory,
  faSatelliteDish, faSignOutAlt, faSolarPanel,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../user.service';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() userLogged = new EventEmitter<{loggedIn: boolean}>();
  @Output() tabSelected = new EventEmitter<string>();
  activeTab = 'trade';

  faCoffee = faCoffee; faUsers = faUsers; faSignOutAlt = faSignOutAlt;
  faHandshake = faHandshake; faHistory = faHistory; faCogs = faCogs;
  faSatelliteDish = faSatelliteDish; faSolarPanel = faSolarPanel;  faUser = faUser;

  constructor(public userService: UserService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSelect(tab: string) {
    this.tabSelected.emit(tab);
    this.activeTab = tab;
  }

  onSignOut() {
    localStorage.clear();
    this.userLogged.emit({loggedIn: false});
  }
}
