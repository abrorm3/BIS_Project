import { Component, OnInit, signal } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../models/project.model';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { FooterInfoComponent } from './footer-info/footer-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AdminPanelService } from '../admin-panel/admin-panel.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProjectCardComponent } from '../projects/project-card/project-card.component';

@Component({
  selector: 'app-booth-details',
  standalone: true,
  templateUrl: './booth-details.component.html',
  styleUrl: './booth-details.component.scss',
  imports: [
    CommonModule,
    ImageSliderComponent,
    FooterInfoComponent,
    MatButtonModule,
    MatIconModule,
    ProjectCardComponent,
  ],
})
export class BoothDetailsComponent implements OnInit {
  booth = signal<Project | null>(null);

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private adminPanelService: AdminPanelService,
    private projectsService: ProjectsService
  ) {}
  isAuthenticated = signal<boolean>(false);
  sanitizedContent: SafeHtml | undefined;
  projects = signal<Project[]>([]);
  selectedInfo = signal<string>('description');

  ngOnInit() {
    this.getProjects();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.projectService.fetchProjectDetails(id).subscribe((res) => {
        this.booth.set(res);
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
          res.htmlContent
        );
        console.log(this.booth());
      });
    });
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
  deleteProject() {
    this.projectService
      .deleteProject(this.booth()?._id)
      .subscribe(() => this.router.navigate(['/projects']));
  }
}
