import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() userLogged = new EventEmitter<{loggedIn: boolean}>();
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSignIn() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;

    this.authService.getAndSetAccessToken(username, password);
    this.userLogged.emit({
      loggedIn: true
    });
  }
}

