import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CallFormComponent } from '../call-form/call-form.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [CommonModule, HeaderComponent, MatButtonModule, CallFormComponent],
})
export class MainComponent {
  isContactOpened = signal(false);

  constructor(private router: Router) {}
  navigateToProjects() {
    this.router.navigate(['/projects']);
  }
  openContactDialog() {
    this.isContactOpened.set(true);
  }
  closeForm() {
    this.isContactOpened.set(false);
  }
}
