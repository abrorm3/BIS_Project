import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer-info',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.scss',
})
export class FooterInfoComponent {
  @Input() price: number | null = null;
}
