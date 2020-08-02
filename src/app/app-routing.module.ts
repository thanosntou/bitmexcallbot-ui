import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './auth/guards/auth-guard.service';
import {UserComponent} from './user/user.component';
import {LoginComponent} from './login/login.component';
import {AppInComponent} from './app-in/app-in.component';
import {SignupComponent} from './auth/signup/signup.component';
import {UserListComponent} from './user-list/user-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginListComponent} from './login-list/login-list.component';
import {TradePanelComponent} from './trade-panel/trade-panel.component';
import {FollowPanelComponent} from './follow-panel/follow-panel.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FollowersPanelComponent} from './followers-panel/followers-panel.component';
import {TraderGuard} from './auth/guards/trader-guard.service';
import {AdminGuard} from './auth/guards/admin-guard.service';
import {RootSettingsComponent} from './settings/root-settings/root-settings.component';
import {AdminSettingsComponent} from './settings/admin-settings/admin-settings.component';
import {FollowerSettingsComponent} from './settings/follower-settings/follower-settings.component';
import {RootGuard} from './auth/guards/root-guard.service';
import {FollowerGuard} from './auth/guards/follower-guard.service';
import {RootUsersComponent} from './root/users/root-users.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], component: AppInComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'follow', component: FollowPanelComponent },
      { path: 'followers', component: FollowersPanelComponent },
      { path: 'followers/:id', component: UserComponent },
      { path: 'trade', canActivate: [TraderGuard], component: TradePanelComponent },
      { path: 'settings', children: [
        { path: 'root', canActivate: [RootGuard], component: RootSettingsComponent },
        { path: 'admin', canActivate: [AdminGuard], component: AdminSettingsComponent },
        { path: 'follower', canActivate: [FollowerGuard], component: FollowerSettingsComponent }]},
      { path: 'users', canActivate: [AdminGuard], component: UserListComponent },
      { path: 'root', canActivate: [RootGuard], children: [
          { path: 'tenants', canActivate: [RootGuard], component: RootUsersComponent},
        ]},
      { path: 'users/:id', canActivate: [AdminGuard], component: UserComponent },
      { path: 'logins', canActivate: [AdminGuard], component: LoginListComponent },
    ]
  },
  { path: 'signup', component: SignupComponent },
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
