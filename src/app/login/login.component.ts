import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseUrl} from '../_enum/BaseUrl.enum';
import {UserModel} from '../_model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _fail = new Subject<string>();
  successMessage: string;
  showSignUp = false;
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  @ViewChild('username2') username2: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('confirmPass') confirmPass: ElementRef;
  @ViewChild('email') email: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this._fail.subscribe((message) => this.successMessage = message);
    this._fail.pipe(debounceTime(2500)).subscribe(() => this.successMessage = null);
    this._fail.next(this.route.snapshot.params['message']);
  }

  onSignIn() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.authService.getAndSetAccessToken(username, password);
  }

  onSignUp() {
    const username = this.username2.nativeElement.value;
    const pass = this.pass.nativeElement.value;
    const confirmPass = this.confirmPass.nativeElement.value;
    const email = this.email.nativeElement.value;

    const body = 'username=' + username
      + '&pass=' + pass
      + '&confirmPass=' + confirmPass
      + '&email=' + email;

    const httpOptions = {headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    })};
    this.http.post<UserModel>(
      BaseUrl.BASEURL + '/api/v1/user/new', body, httpOptions
    ).subscribe((data: UserModel) =>
      this.authService.getAndSetAccessToken(data.username, data.password));
  }

  onShowSignUp() {
    this.showSignUp = !this.showSignUp;
  }
}

