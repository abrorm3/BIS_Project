import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ManagementPanelComponent } from './admin-panel/management-panel/management-panel.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainComponent,
    BrowserAnimationsModule,
    AdminPanelComponent,
    HeaderComponent,
    HttpClientModule,
    ManagementPanelComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
