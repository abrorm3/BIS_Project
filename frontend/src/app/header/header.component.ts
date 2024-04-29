import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CallFormComponent } from '../call-form/call-form.component';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, MatToolbarModule, MatButtonModule, CallFormComponent],
})
export class HeaderComponent implements OnInit {
  isContactOpened = signal(false);
  isAuthenticated = signal<boolean>(false);

  constructor(
    private router: Router,
    private adminPanelService: AdminPanelService
  ) {}
  ngOnInit(): void {
    this.adminPanelService.isAuthenticated().subscribe((res) => {
      if (res) {
        this.isAuthenticated.set(true);
      } else {
        this.isAuthenticated.set(false);
      }
    });
  }
  navigateTo(to: string) {
    this.router.navigate([to]);
  }
  openContactDialog() {
    this.isContactOpened.set(true);
  }
  closeForm() {
    this.isContactOpened.set(false);
  }
  openApplications() {
    this.router.navigate(['/applications']);
  }
}
