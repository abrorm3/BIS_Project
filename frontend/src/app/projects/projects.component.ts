import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';
import { ProjectCardComponent } from './project-card/project-card.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  constructor(private projectsService: ProjectsService){};
  selectedCurrency = signal<string>('$');
  projects = signal<Project[]>([]);
ngOnInit(): void {
  this.getProjects();
}
  getProjects(){
    this.projectsService.fetchProjects().subscribe((projects)=>{
      this.projects.set(projects);
      console.log(this.projects());

    });
  }
}
