import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ErrorResponseService} from '../_services/error-response.service';

@Component({
  selector: 'app-app-in',
  templateUrl: './app-in.component.html',
  styleUrls: ['./app-in.component.css']
})
export class AppInComponent implements OnInit, OnDestroy {
  errorMessage: string;
  private errorSub: Subscription;

  constructor(private errorResponseService: ErrorResponseService) {}

  ngOnInit() {
    this.errorSub = this.errorResponseService.getMessage().subscribe(
      message => {
        this.errorMessage = message.text;
        setTimeout(() => this.errorMessage = null, 2000);
      }
    );
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

}
