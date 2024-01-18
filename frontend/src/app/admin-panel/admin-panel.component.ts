import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminPanelService } from './admin-panel.service';
import { NgForm } from '@angular/forms';
import { AuthResponse } from '../models/admin-panel.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatCardModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent {
  loggedIn = signal<boolean | null>(null);
  isLoading = signal(false);
  isLoginMode = signal(true);
  visible = signal(false);
  changetype = signal(false);
  errorMessage = signal<string>('');

  email = signal<string>('');
  password = signal<string>('');
  askedUsername = signal(false);
  userId = signal<string | null>(null);
  username: string = '';

  usernameAvailability = signal<boolean | null>(null);

  constructor(
    private httpClient: HttpClient,
    private authService: AdminPanelService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email.toLowerCase();
    const password = form.value.password;
    this.isLoading.set(true);

    if (this.isLoginMode()) {
      //LOGIN
      this.authService.login({ email, password }).subscribe({
        next: (resData: AuthResponse) => {
          // console.log('Logged in!', resData.token, resData.userId);
          this.isLoading.set(false);
          this.router.navigate(['/admin/management']);
          this.userId.set(this.authService.getUserId());
        },
        error: (errorMessage: any) => {
          this.errorMessage.set(errorMessage);
          this.isLoading.set(false);
          console.error('Login failed:', errorMessage);
        },
      });
    }

    if (!this.isLoginMode()) {
      //SIGN UP
      this.authService.signup({ email, password }).subscribe({
        next: (resData) => {
          console.log('Registered!', resData.token);
          this.isLoading.set(false);
          this.askedUsername.set(true);
          this.userId.set(this.authService.getUserId());
          // this.router.navigate(['/feed']);
        },
        error: (errorMessage) => {
          this.errorMessage.set(errorMessage.toString().split(': ')[1]);
          this.isLoading.set(false);
          console.error('Registration failed:', errorMessage);
        },
      });
    }

    form.reset();
  }
  viewpassword() {
    this.visible.set(!this.visible());
    this.changetype.set(!this.changetype());
  }
  onSwitchMode() {
    this.isLoginMode.set(!this.isLoginMode());
  }
  setUsername(form: NgForm) {
    console.log('logged');

    const username = form.value.username;
    this.authService.updateUsername(this.userId(), username).subscribe({
      next: (response) => {
        console.log('Update successful:', response);
        this.router.navigate(['/admin/management']);
      },
      error: (error) => {
        console.error('Update failed:', error);
      },
    });
  }
  checkUsernameAvailability() {
    const username = this.username.toLowerCase();
    this.usernameAvailability.set(null);

    this.authService.checkUsernameAvailability(username).subscribe(
      (response: any) => {
        this.usernameAvailability.set(response.available);
      },
      (error) => {
        console.error('Error checking username availability:', error);
      }
    );
  }
  navigateToForgotPassword() {
    this.router.navigate(['/admin/forgot-password']);
    console.log('asdas');

  }
}
