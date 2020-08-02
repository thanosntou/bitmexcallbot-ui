import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../../_services/authentication.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserModel} from '../../_models/user.model';
import {BaseUrl} from '../../_enums/BaseUrl.enum';
import {UserFormModel} from '../../_models/userForm.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  newUserForm: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
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
        'Authorization': 'no-auth'
      })
    };

    console.log(userForm);

    this.http.post<UserModel>(BaseUrl.B1 + '/api/v1/user', userForm, httpOptions).subscribe(
      (data: UserModel) => this.authService.getAndSetAccessToken(data.username, data.password).subscribe(
        (token) => this.authService.authenticate(token).subscribe(
          (userDetails) => {
            if (this.authService.isFollower()) {
              this.router.navigate(['/settings']);
            } else if (this.authService.isTrader()) {
              this.router.navigate(['/trade']);
            } else if (this.authService.isAdmin()) {
              this.router.navigate(['/notreadyyet']);
            } else if (this.authService.isRoot()) {
              this.router.navigate(['/notreadyyet']);
            }},
          error =>
            this.router.navigate(['/login'])
            // setTimeout(() => this.errorMessage = null, 2500);
        ),
        error => {
          this.router.navigate(['/login']);
          // setTimeout(() => this.errorMessage = null, 2500);
        }
      ),
      error =>
        // TODO appear message instead redirect
        this.router.navigate(['/login'])
    );
  }
}
