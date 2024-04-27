import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminPanelService } from 'src/app/admin-panel/admin-panel.service';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.scss',
})
export class AuthenticatedComponent {
  isAuthenticated = signal<boolean>(false);

  constructor(private adminPanelService: AdminPanelService) {}

  ngOnInit(): void {
    this.getUser();
    console.log('sss');
  }
  getUser() {
    const userStored = localStorage.getItem('user');
    if (userStored) {
      this.adminPanelService.getUser().subscribe({
        next: (res) => {
          if (res) {
            console.log('trrr');

            this.isAuthenticated.set(true);
          } else {
            console.log('falsee');

            this.isAuthenticated.set(false);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  logout() {
    this.adminPanelService.logout();
    this.isAuthenticated.set(false);
    console.log(this.isAuthenticated());
  }
}
