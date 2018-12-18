import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { AppComponent } from './app.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    TradePanelComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
