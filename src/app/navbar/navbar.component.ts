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
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() userSignedOut = new EventEmitter<{signedOut: boolean}>();
  @Output() tabSelected = new EventEmitter<string>();
  isAdmin: boolean;
  isTrader: boolean;
  isCustomer: boolean;

  faCoffee = faCoffee; faUsers = faUsers; faSignOutAlt = faSignOutAlt;
  faHandshake = faHandshake; faHistory = faHistory; faCogs = faCogs;
  faSatelliteDish = faSatelliteDish; faSolarPanel = faSolarPanel;  faUser = faUser;

  constructor(private router: Router,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.userDetails.authorities.forEach( (auth) => {
      console.log(auth);
      if (auth.authority === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
      if (auth.authority === 'ROLE_TRADER') {
        this.isTrader = true;
      }
      if (auth.authority === 'ROLE_CUSTOMER') {
        this.isCustomer = true;
      }
    });
  }

  onSignOut() {
    localStorage.clear();
    // this.userSignedOut.emit({ signedOut: true });
    this.authService.userDetails = null;
    this.router.navigate(['/']);
  }
}
