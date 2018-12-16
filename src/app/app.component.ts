import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bitmexcallbot-ui';
  hidden1 = false;
  hidden2 = false;
  hidden3 = false;
  faCoffee = faCoffee;

  hideOrAppear1() {
    this.hidden1 = !this.hidden1;
  }

  hideOrAppear2() {
    this.hidden2 = !this.hidden2;
  }

  hideOrAppear3() {
    this.hidden3 = !this.hidden3;
  }
}
