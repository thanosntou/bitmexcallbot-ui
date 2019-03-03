import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TxComponent } from './tx/tx.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { FollowPanelComponent } from './follow-panel/follow-panel.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowersPanelComponent } from './followers-panel/followers-panel.component';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoginComponent } from './login/login.component';
import { OpenPositionDirective} from './trade-panel/open-position.directive';
import { ActiveOrdersComponent } from './trade-panel/active-orders/active-orders.component';
import { OpenPositionsComponent } from './trade-panel/open-positions/open-positions.component';
import { SettingItemDirective} from './setting-item.directive';
import { RouterModule, Routes} from '@angular/router';
import { AppInComponent } from './app-in/app-in.component';
import { LoginListComponent } from './login-list/login-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { FaqComponent } from './faq/faq.component';
import { WalletInfoComponent } from './user/wallet-info/wallet-info.component';
import { BitmexWalletSummaryComponent } from './user/bitmex-wallet-summary/bitmex-wallet-summary.component';
import { BitmexWalletHistoryComponent } from './user/bitmex-wallet-history/bitmex-wallet-history.component';
import { ChatComponent } from './chat/chat.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:message', component: LoginComponent },
  { path: '', component: AppInComponent, children: [
      { path: 'chat', component: ChatComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'follow', component: FollowPanelComponent },
      { path: 'followers', component: FollowersPanelComponent },
      { path: 'followers/:id', component: UserComponent },
      { path: 'trade', component: TradePanelComponent },
      { path: 'tx', component: TxComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserComponent },
      { path: 'logins', component: LoginListComponent },
    ]
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TradePanelComponent,
    FollowersPanelComponent,
    FollowPanelComponent,
    TxComponent,
    SettingsComponent,
    DashboardComponent,
    NavbarComponent,
    UnlessDirective,
    DropdownDirective,
    NewAccountComponent,
    LoginComponent,
    OpenPositionDirective,
    SettingItemDirective,
    ActiveOrdersComponent,
    OpenPositionsComponent,
    AppInComponent,
    UserListComponent,
    LoginListComponent,
    UserComponent,
    FaqComponent,
    WalletInfoComponent,
    BitmexWalletSummaryComponent,
    BitmexWalletHistoryComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
