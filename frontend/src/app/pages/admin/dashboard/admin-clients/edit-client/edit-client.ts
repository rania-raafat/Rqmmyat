import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ClientsService } from '../../../../../services/clients/clients';

import { Client } from '../../../../../models/client';

@Component({
  selector: 'app-edit-client',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './edit-client.html',

  styleUrl: './edit-client.css',
})
export class EditClient implements OnInit {
  clientForm!: FormGroup;

  clientId = '';

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  currentLogo = '';

  loading = false;

  constructor(
    private fb: FormBuilder,

    private route: ActivatedRoute,

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

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';

    this.loadClient();
  }

  loadClient(): void {
    this.clientsService.getClient(this.clientId).subscribe({
      next: (client: Client) => {
        this.currentLogo = client.logo;

        this.imagePreview = client.logo;

        this.clientForm.patchValue({
          name: client.name,

          featured: client.featured,
        });

        this.cd.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.toastr.error('Failed to load client');
      },
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
    if (this.clientForm.invalid) {
      this.toastr.warning('Please complete required fields');

      return;
    }

    this.loading = true;

    const updateClient = (logoUrl: string) => {
      const clientData: Client = {
        name: this.clientForm.value.name,

        logo: logoUrl,

        featured: this.clientForm.value.featured,
      };

      this.clientsService.updateClient(this.clientId, clientData).subscribe({
        next: () => {
          this.loading = false;

          this.toastr.success('Client updated successfully');

          this.router.navigate(['/dashboard/clients']);
        },

        error: (err) => {
          console.error(err);

          this.loading = false;

          this.toastr.error('Failed to update client');
        },
      });
    };

    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('image', this.selectedFile);

      this.clientsService.uploadImage(formData).subscribe({
        next: (res: any) => {
          updateClient(res.url);
        },

        error: () => {
          this.loading = false;

          this.toastr.error('Image upload failed');
        },
      });
    } else {
      updateClient(this.currentLogo);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/clients']);
  }
}
