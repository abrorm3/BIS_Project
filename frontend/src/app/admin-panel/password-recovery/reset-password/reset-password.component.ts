import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminPanelService } from '../../admin-panel.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,FormsModule,MatInputModule,MatButtonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  id: string = '';
  token: string = '';
  newPassword: string = '';
  errorMessage: string = '';
  showSuccessMessage: boolean = false;

  constructor(private route: ActivatedRoute, private authService: AdminPanelService, private router:Router) {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.token = params['token'];
      console.log(this.id+ " id.");
      console.log(this.token+ " token.");

    });
  }

  resetPassword() {
    this.authService
      .resetPassword(this.id, this.token, this.newPassword)
      .subscribe({
        next: () => {
          this.errorMessage='';
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 4000);
        },
        error: (error) => {
          console.error(error);
          this.errorMessage = error.error.message;
        },
      });
  }
}
