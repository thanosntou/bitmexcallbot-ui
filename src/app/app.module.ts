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
import { AdminService } from './admin.service';
import {UserService} from './user.service';
import { LoginComponent } from './login/login.component';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AdminService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
