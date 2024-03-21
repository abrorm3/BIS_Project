import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  openContactDialog(){}
}
