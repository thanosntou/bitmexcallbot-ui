import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TxComponent} from './tx/tx.component';
import {AuthGuard} from './auth-guard.service';
import {FaqComponent} from './faq/faq.component';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {AppInComponent} from './app-in/app-in.component';
import {SettingsComponent} from './settings/settings.component';
import {UserListComponent} from './user-list/user-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginListComponent} from './login-list/login-list.component';
import {TradePanelComponent} from './trade-panel/trade-panel.component';
import {FollowPanelComponent} from './follow-panel/follow-panel.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FollowersPanelComponent} from './followers-panel/followers-panel.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:message', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], component: AppInComponent, children: [
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
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
