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
  ],
  templateUrl: './new-project.component.html',
  styleUrl: './new-project.component.scss',
})
export class NewProjectComponent implements OnInit {
  project: Project = {
    _id: '',
    title: '',
    location: '',
    imageUrls: [],
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
    photo: '',
    adminName: '',
    productionTime: 0,
    inStock: false,
    htmlContent: '',
  };
  editorConfig = editorConfig;
  businessTypes = signal<BusinessTypes[] | null>(null);
  isImgLoading = signal<boolean>(false);
  constructor(
    private projectsService: ProjectsService,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    this.projectsService.fetchBusinessTypes().subscribe((res) => {
      this.businessTypes.set(res);
      console.log(this.businessTypes());
    });
  }
  create(data: NgForm) {
    console.log(data.value);
  }
  onImageUpload() {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';

    // Listen for file selection
    inputElement.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];

      if (file) {
        this.isImgLoading.set(true);
        // Upload the image to Firebase Storage
        this.imageUploadService
          .uploadImage(file, `${new Date()}/${this.project.title}`)
          .then((downloadUrl) => {
            // Inserting the image URL into the editor
            const html = `<img style="max-height: 50vh;" src="${downloadUrl}" alt="Uploaded Image" />`;
            this.isImgLoading.set(false);
            // Using execCommand to insert HTML at the current cursor position, but yeah it is deprecated
            document.execCommand('insertHTML', false, html);
          });
      }
    });

    // Triggering the file input dialog
    inputElement.click();
  }
}
