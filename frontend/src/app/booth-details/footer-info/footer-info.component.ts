import { Component, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CallFormComponent } from '../../call-form/call-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer-info',
  standalone: true,
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.scss',
  imports: [MatButtonModule, CallFormComponent, CommonModule],
})
export class FooterInfoComponent {
  @Input() price: number | null = null;
  isContactOpened = signal(false);

  openContactDialog() {
    this.isContactOpened.set(true);
    console.log('trr');
  }
  closeForm() {
    this.isContactOpened.set(false);
  }
}
