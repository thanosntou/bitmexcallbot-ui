import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { FollowPanelComponent } from './follow-panel/follow-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FollowersPanelComponent } from './followers-panel/followers-panel.component';
import { UnlessDirective } from './_directives/unless.directive';
import { DropdownDirective } from './shared/dropdown.directive';
import { NewAccountComponent } from './new-account/new-account.component';
import { LoginComponent } from './login/login.component';
import { OpenPositionDirective } from './trade-panel/open-position.directive';
import { ActiveOrdersComponent } from './trade-panel/active-orders/active-orders.component';
import { OpenPositionsComponent } from './trade-panel/open-positions/open-positions.component';
import { SettingItemDirective} from './_directives/setting-item.directive';
import { AppInComponent } from './app-in/app-in.component';
import { LoginListComponent } from './login-list/login-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { WalletInfoComponent } from './user/wallet-info/wallet-info.component';
import { BitmexWalletSummaryComponent } from './user/bitmex-wallet-summary/bitmex-wallet-summary.component';
import { BitmexWalletHistoryComponent } from './user/bitmex-wallet-history/bitmex-wallet-history.component';
import { ChatComponent } from './chat/chat.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RootGuard } from './auth/guards/root-guard.service';
import { TraderGuard } from './auth/guards/trader-guard.service';
import { FollowerGuard } from './auth/guards/follower-guard.service';
import { AdminGuard} from './auth/guards/admin-guard.service';
import { AuthoritiesToNamesPipe } from './_pipes/authorities-to-names.pipe';
import { AuthInterceptor } from './_interceptors/auth-interceptor';
import { MethodInterceptor } from './_interceptors/method-interceptor';
import { HttpErrorResponseInterceptor } from './_interceptors/http-error-response-interceptor';
import { FollowerSettingsComponent } from './settings/follower-settings/follower-settings.component';
import { AdminSettingsComponent } from './settings/admin-settings/admin-settings.component';
import { RootSettingsComponent } from './settings/root-settings/root-settings.component';
import { RootUsersComponent } from './root/users/root-users.component';

@NgModule({
  declarations: [
    AppComponent,
    TradePanelComponent,
    FollowersPanelComponent,
    FollowPanelComponent,
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
    WalletInfoComponent,
    BitmexWalletSummaryComponent,
    BitmexWalletHistoryComponent,
    ChatComponent,
    PageNotFoundComponent,
    SigninComponent,
    SignupComponent,
    AuthoritiesToNamesPipe,
    FollowerSettingsComponent,
    AdminSettingsComponent,
    RootSettingsComponent,
    RootUsersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard, FollowerGuard, TraderGuard, AdminGuard, RootGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MethodInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorResponseInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
