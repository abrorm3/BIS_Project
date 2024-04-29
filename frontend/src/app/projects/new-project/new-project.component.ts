import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Project } from 'src/app/models/project.model';
import { ProjectsService } from '../projects.service';
import { BusinessTypes } from 'src/app/models/businessTypes.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { editorConfig } from './editor-config';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatButtonModule } from '@angular/material/button';
import { ImageUploadService } from 'src/app/shared/image-upload.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    CommonModule,
    AngularEditorModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss',
})
export class NewProjectComponent implements OnInit {
  project: Project = {
    _id: '',
    title: '',
    location: '',
    businessType: '',
    dimensions: { width: 0, depth: 0, height: 0 },
    doorType: '',
    foundation: '',
    roof: '',
    insulation: '',
    floor: '',
    facade: '',
    electricity: '',
    additionalFeatures: [],
    price: 0,
    imageUrls: [],
    productionTime: 0,
    inStock: false,
    htmlContent: '',
    adminName: localStorage.getItem('email') || '',
  };
  editorConfig = editorConfig;
  businessTypes = signal<BusinessTypes[] | null>(null);
  isImgLoading = signal<boolean>(false);
  uploadedImageUrl = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor(
    private projectsService: ProjectsService,
    private imageUploadService: ImageUploadService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.projectsService.fetchBusinessTypes().subscribe((res) => {
      this.businessTypes.set(res);
      console.log(this.businessTypes());
    });
  }
  create(data: NgForm) {
    console.log(data.value);
    console.log(this.project.adminName);

    this.projectsService.createProject(this.project).subscribe(
      (res) => {
        console.log(res);
        this.route.navigate(['/projects']);
      },
      (error) => {
        console.log(error);

        this.errorMessage = error.message;
      }
    );
  }

  onImageUpload() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    // inputElement.multiple = true;

    inputElement.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];

      if (file) {
        this.isImgLoading.set(true);
        this.imageUploadService
          .uploadImage(file, `${new Date()}/${this.project.title}`)
          .then((downloadUrl) => {
            const html = `<img style="max-height: 50vh;" src="${downloadUrl}" alt="Uploaded Image" />`;
            this.isImgLoading.set(false);
            this.project.imageUrls.push(downloadUrl);
            console.log(downloadUrl);

            document.execCommand('insertHTML', false, html);
          });
      }
    });
    inputElement.click();
  }
}
