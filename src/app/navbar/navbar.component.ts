import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  faCoffee,
  faCogs,
  faHandshake,
  faHistory,
  faSatelliteDish, faSignOutAlt, faSolarPanel,
  faUser,
  faUsers,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';
import {UserDetailsModel} from '../user-details.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userDetails: UserDetailsModel;
  isAdmin = false;
  isTrader = false;
  isCustomer = false;
  @Output() userSignedOut = new EventEmitter<{signedOut: boolean}>();
  @Output() tabSelected = new EventEmitter<string>();

  faCoffee = faCoffee; faUsers = faUsers; faSignOutAlt = faSignOutAlt;
  faHandshake = faHandshake; faHistory = faHistory; faCogs = faCogs;
  faSatelliteDish = faSatelliteDish; faQuestionCircle = faQuestionCircle;  faUser = faUser;

  constructor(private router: Router,
              public authService: AuthenticationService) { }

  ngOnInit() {
    this.userDetails = this.authService.findUserDetails();
    this.authService.findUserRoles().forEach(auth => {
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
    this.isAdmin = false;
    this.isTrader = false;
    this.isCustomer = false;
    this.userDetails = null;
    this.authService.deleteUserConnection();
    this.router.navigate(['/login']);
  }

}
