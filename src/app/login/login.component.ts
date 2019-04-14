import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
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
  @ViewChild('username') username: ElementRef;
  @ViewChild('password') password: ElementRef;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this._fail.subscribe((message) => this.successMessage = message);
    this._fail.pipe(debounceTime(2500)).subscribe(() => this.successMessage = null);
    this._fail.next(this.route.snapshot.queryParams['message']);
  }

  onSignIn() {
    const username = this.username.nativeElement.value;
    const password = this.password.nativeElement.value;
    this.authService.getAndSetAccessToken(username, password);
  }
}

