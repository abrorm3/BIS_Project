import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Application } from 'src/app/models/application.model';
import { CallFormService } from '../call-form-service.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.scss',
})
export class ApplicationsComponent implements OnInit {
  applications = signal<Application[]>([]);

  constructor(private callFormService: CallFormService) {}

  ngOnInit(): void {
    this.callFormService.getApplications().subscribe((res) => {
      this.applications.set(res);
    });
  }
}
