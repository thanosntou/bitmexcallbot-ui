import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from '../../authentication.service';
import {NgForm} from '@angular/forms';
import {UserModel} from '../../_model/user.model';
import {BaseUrl} from '../../_enum/BaseUrl.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const body = 'username=' + form.value.username
      + '&pass=' + form.value.pass
      + '&confirmPass=' + form.value.confirmPass
      + '&email=' + form.value.email
      + '&PIN=' + form.value.pin;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    this.http.post<UserModel>(
      BaseUrl.B1 + '/api/v1/user/new', body, httpOptions
    ).subscribe((data: UserModel) =>
      this.authService.getAndSetAccessToken(data.username, data.password));
  }
}
