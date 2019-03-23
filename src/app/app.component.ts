import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.authService.findToken()) {
      // this.authService.authenticate(this.authService.findToken());
      this.router.navigate(['/trade']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
