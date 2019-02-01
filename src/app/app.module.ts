import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { TxComponent } from './tx/tx.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WalletComponent } from './wallet/wallet.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { FollowPanelComponent } from './follow-panel/follow-panel.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowersPanelComponent } from './followers-panel/followers-panel.component';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoginComponent } from './login/login.component';
import {OpenPositionDirective} from './trade-panel/open-position.directive';
import { ActiveOrdersComponent } from './trade-panel/active-orders/active-orders.component';
import { OpenPositionsComponent } from './trade-panel/open-positions/open-positions.component';
import {SettingItemDirective} from './setting-item.directive';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'follow', component: FollowPanelComponent },
  { path: 'followers', component: FollowersPanelComponent },
  { path: 'trade', component: TradePanelComponent },
  { path: 'tx', component: TxComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'admin', component: AdminPanelComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TradePanelComponent,
    FollowersPanelComponent,
    FollowPanelComponent,
    TxComponent,
    WalletComponent,
    SettingsComponent,
    AdminPanelComponent,
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
