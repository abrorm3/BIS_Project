import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgFor],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projects:Project[] = [];
  @Input() currency: string = '$';


}
