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
import { ForgotPasswordComponent } from './admin-panel/password-recovery/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './admin-panel/password-recovery/reset-password/reset-password.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthenticatedComponent } from "./shared/authenticated/authenticated.component";

@NgModule({
    declarations: [AppComponent],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MainComponent,
        BrowserAnimationsModule,
        AdminPanelComponent,
        HeaderComponent,
        HttpClientModule,
        ManagementPanelComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        provideFirebaseApp(() => initializeApp({
            projectId: 'budkauz-ceced',
            appId: '1:988605526370:web:075e803da811656b107c3b',
            storageBucket: 'budkauz-ceced.appspot.com',
            apiKey: 'AIzaSyBZ74zcGu1AL4nmGvsDDJktnmGHMcVX0k4',
            authDomain: 'budkauz-ceced.firebaseapp.com',
            messagingSenderId: '988605526370',
            measurementId: 'G-VWNSQ8GGD1',
        })),
        provideFirestore(() => getFirestore()),
        AuthenticatedComponent
    ]
})
export class AppModule {}
