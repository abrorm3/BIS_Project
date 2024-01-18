import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelService } from '../../admin-panel.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatCardModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  errorExists: boolean = false;
  constructor(
    private authService: AdminPanelService,
    private _location: Location
  ) {}
  sendPasswordResetLink() {
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.message = response.message;
        this.errorExists = false;
      },
      error: (error) => {
        console.error(error);
        this.errorExists = true;
        this.message = error.error.message;
      },
    });
  }
  navigateBack() {
    this._location.back();
  }
}
