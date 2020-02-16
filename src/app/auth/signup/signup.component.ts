import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../../_services/authentication.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {BaseUrl} from '../../_enums/BaseUrl.enum';
import {UserFormModel} from '../../_models/userForm.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUserForm: FormGroup;

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.newUserForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'pass': new FormControl(null, Validators.required),
      'confirmPass': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'role': new FormControl(null, Validators.required),
      'referer': new FormControl(null, Validators.required)
    });
  }

  onSignUp() {
    const userForm: UserFormModel = this.newUserForm.value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/user', userForm, httpOptions)
      .subscribe((data: UserModel) =>
        this.authService.getAndSetAccessToken(data.username, data.password));
  }
}
