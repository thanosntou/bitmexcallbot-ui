import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../BaseUrl.enum';
import {AccessTokenModel} from '../access-token.model';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() userLogged = new EventEmitter<{loggedIn: boolean}>();
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;
  accessToken: AccessTokenModel;

  constructor(private http: HttpClient, private userService: UserService) { }

  ngOnInit() {
  }

  onSignIn() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic dGVzdDprb2JpbmVz'})
    };

    const body = 'username=' + this.username.nativeElement.value
      + '&password=' + this.password.nativeElement.value
      + '&grant_type=' + 'password';

    this.http.post<AccessTokenModel>(
      BaseUrl.BASEURL + '/oauth/token',
      body,
      httpOptions
    ).subscribe((data: AccessTokenModel) => {
      this.userLogged.emit({loggedIn: true});
      this.accessToken = data;
      localStorage.setItem('accessToken', JSON.stringify(this.accessToken));

      this.userService.authenticate(this.accessToken);

    }, error => console.log(error));

  }

}
