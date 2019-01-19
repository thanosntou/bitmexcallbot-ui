import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignIn() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    this.authService.getAndSetAccessToken(username, password);
  }
}

