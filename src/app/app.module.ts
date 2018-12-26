import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { FollowersPanelComponent } from './followers-panel/followers-panel.component';
import { FollowPanelComponent } from './follow-panel/follow-panel.component';
import { NewsComponent } from './news/news.component';
import { TxComponent } from './tx/tx.component';
import { WalletComponent } from './wallet/wallet.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TradePanelComponent,
    FollowersPanelComponent,
    FollowPanelComponent,
    NewsComponent,
    TxComponent,
    WalletComponent,
    SettingsComponent,
    AdminPanelComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
