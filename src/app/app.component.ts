import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  title = 'bitmexcallbot-ui';
  activeTab = 'trade';

  onNavigate(tab: string) {
    this.activeTab = tab;
  }
}
