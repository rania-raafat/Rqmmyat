import { Component, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ClientsService } from '../../../../../services/clients/clients';

import { Client } from '../../../../../models/client';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css',
})
export class AddClient {
  clientForm!: FormGroup;

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,

    private router: Router,

    private clientsService: ClientsService,

    private toastr: ToastrService,

    private cd: ChangeDetectorRef,
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],

      featured: [false],
    });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;

      this.cd.detectChanges();
    };

    reader.readAsDataURL(this.selectedFile);
  }

  saveClient(): void {
    if (this.clientForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please fill all required fields and select logo');

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('image', this.selectedFile);

    this.clientsService.uploadImage(formData).subscribe({
      next: (uploadRes: any) => {
        const clientData: Client = {
          name: this.clientForm.value.name,

          logo: uploadRes.url,

          featured: this.clientForm.value.featured,
        };

        this.clientsService.createClient(clientData).subscribe({
          next: () => {
            this.loading = false;

            this.toastr.success('Client created successfully');

            this.router.navigate(['/dashboard/clients']);
          },

          error: () => {
            this.loading = false;

            this.toastr.error('Failed to create client');
          },
        });
      },

      error: () => {
        this.loading = false;

        this.toastr.error('Logo upload failed');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/clients']);
  }
}
