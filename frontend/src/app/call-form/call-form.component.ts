import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CallFormService } from './call-form-service.service';
import { FormControl, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-call-form',
  standalone: true,
  imports: [MatIconModule, CommonModule, FormsModule],
  templateUrl: './call-form.component.html',
  styleUrl: './call-form.component.scss',
})
export class CallFormComponent {
  @Output() closeModalDialog = new EventEmitter();

  name = new FormControl('');
  phone = new FormControl('');

  constructor(private callFormService: CallFormService) {}

  onSubmit() {
    this.callFormService
      .createApplication({ name: this.name.value!, phone: this.phone.value! })
      .subscribe(
        (response) => {
          console.log('Application created:', response);
          this.closeModalDialog.emit();
        },
        (error) => {
          console.error('Error creating application:', error);
        }
      );
  }

  closeModal() {
    this.closeModalDialog.emit();
  }
}
