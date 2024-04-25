import { Component, OnInit, signal } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../models/project.model';
import { CommonModule } from '@angular/common';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { FooterInfoComponent } from "./footer-info/footer-info.component";

@Component({
    selector: 'app-booth-details',
    standalone: true,
    templateUrl: './booth-details.component.html',
    styleUrl: './booth-details.component.scss',
    imports: [CommonModule, ImageSliderComponent, FooterInfoComponent]
})
export class BoothDetailsComponent implements OnInit {
  booth = signal<Project | null>(null);

  constructor(
    private projectService: ProjectsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.projectService.fetchProjectDetails(id).subscribe((res) => {
        this.booth.set(res);
        console.log(this.booth());
      });
    });
  }
}
