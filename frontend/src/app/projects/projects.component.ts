import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';
import { ProjectCardComponent } from './project-card/project-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AdminPanelService } from '../admin-panel/admin-panel.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ProjectCardComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private adminPanelService: AdminPanelService,
    private route: Router
  ) {}
  selectedCurrency = signal<string>('$');
  projects = signal<Project[]>([]);
  isAuthenticated = signal<boolean>(false);
  ngOnInit(): void {
    this.getProjects();
    this.adminPanelService.isAuthenticated().subscribe((res) => {
      if (res) {
        this.isAuthenticated.set(true);
      } else {
        this.isAuthenticated.set(false);
      }
    });
  }
  getProjects() {
    this.projectsService.fetchProjects().subscribe((projects) => {
      console.log(projects);

      this.projects.set(projects);
    });
  }
  newProject() {
    this.route.navigate(['/create-project']);
  }
}
