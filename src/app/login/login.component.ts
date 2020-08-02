import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage: string;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
  }

  onSignIn() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.authService.getAndSetAccessToken(username, password).subscribe(
      (token) => {
        this.authService.authenticate(token).subscribe(
          () => {
            if (this.authService.isFollower()) {
              this.router.navigate(['/settings']);
            } else if (this.authService.isTrader()) {
              this.router.navigate(['/trade']);
            } else if (this.authService.isAdmin()) {
              this.router.navigate(['/settings/admin']);
            } else if (this.authService.isRoot()) {
              this.router.navigate(['/settings/root']);
            }
          },
          error => {
            this.isLoading = false;
            this.errorMessage = 'error';
            setTimeout(() => this.errorMessage = null, 2500);
          }
        );
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Wrong username or password.';
        setTimeout(() => this.errorMessage = null, 2500);
      }
    );
  }
}

