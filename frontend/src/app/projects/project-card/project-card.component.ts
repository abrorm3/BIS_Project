import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projects:Project[] = [];
  @Input() currency: string = '$';

  constructor(private router:Router){}

  navigateToDetails(booth:Project ){
    const boothTitle = booth.title.replace(/\s+/g, '-');
    const boothId = booth._id;
    this.router.navigate(['/details', boothTitle,boothId ])
    // this.router.navigate()
  }
}
