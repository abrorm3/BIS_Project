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
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule,
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
  approvalAsked = signal(false);

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

  ngOnInit() {}

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
          this.router.navigate(['/main']);
          this.userId.set(this.authService.getUserId());
        },
        error: (errorMessage: any) => {
          this.errorMessage.set(errorMessage);
          this.isLoading.set(false);
          console.error('Login failed:', errorMessage);
        },
      });
    }

    //SIGN UP
    if (!this.isLoginMode()) {
      return this.sendApprovalEmail(email, password);
    }

    form.reset();
  }
  sendApprovalEmail(email: string, password: string) {
    this.authService.approval(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        console.log('Approval asked');
        this.approvalAsked.set(true);
      },
    });
  }
  viewpassword() {
    this.visible.set(!this.visible());
    this.changetype.set(!this.changetype());
  }
  onSwitchMode() {
    this.isLoginMode.set(!this.isLoginMode());
  }
  navigateToForgotPassword() {
    this.router.navigate(['/admin/forgot-password']);
  }
  goToMainPage() {
    this.router.navigate(['/main']);
  }
}
