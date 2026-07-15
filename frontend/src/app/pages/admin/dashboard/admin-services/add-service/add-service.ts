import { Component, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormArray
} from '@angular/forms';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ServicesService } from '../../../../../services/services/services';

import {
  Service,
  SubService
} from '../../../../../models/service';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-service.html',
  styleUrl: './add-service.css',
})
export class AddService {

  serviceForm!: FormGroup;

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addService: ServicesService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef
  ) {

    this.serviceForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      shortDescription: [''],

      description: [''],

      subServices: this.fb.array([])

    });

  }

  /* ==========================
      SUB SERVICES
  ========================== */

  get subServices(): FormArray {

    return this.serviceForm.get(
      'subServices'
    ) as FormArray;

  }

  addSubService(): void {

    this.subServices.push(

      this.fb.group({

        title: [''],

        description: [''],

        features: this.fb.array([])

      })

    );

  }

  removeSubService(index: number): void {

    this.subServices.removeAt(index);

  }

  getFeatures(
    subIndex: number
  ): FormArray {

    return this.subServices
      .at(subIndex)
      .get('features') as FormArray;

  }

  addFeature(
    subIndex: number
  ): void {

    this.getFeatures(
      subIndex
    ).push(

      this.fb.control('')

    );

  }

  removeFeature(
    subIndex: number,
    featureIndex: number
  ): void {

    this.getFeatures(
      subIndex
    ).removeAt(featureIndex);

  }

  /* ==========================
      IMAGE
  ========================== */

  onImageSelect(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const file =
      input.files[0];

    this.selectedFile = file;

    const reader =
      new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

      this.cd.detectChanges();

    };

    reader.readAsDataURL(file);

  }

  /* ==========================
      SAVE SERVICE
  ========================== */

  saveService(): void {

    if (
      this.serviceForm.invalid ||
      !this.selectedFile
    ) {

      this.toastr.warning(
        'Please complete all required fields and select an image',
        'Missing Data'
      );

      return;

    }

    this.loading = true;

    const formData =
      new FormData();

    formData.append(
      'image',
      this.selectedFile
    );

    this.addService
      .uploadImage(formData)
      .subscribe({

        next: (uploadRes: any) => {

          const serviceData: Service = {

            title:
              this.serviceForm.value.title,

            slug:
              this.serviceForm.value.title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-'),

            shortDescription:
              this.serviceForm.value.shortDescription,

            description:
              this.serviceForm.value.description,

            image:
              uploadRes.url,

            subServices:
              this.serviceForm.value.subServices

          };

          this.addService
            .createService(
              serviceData
            )
            .subscribe({

              next: () => {

                this.loading = false;

                this.toastr.success(
                  'Service created successfully',
                  'Success'
                );

                this.router.navigate([
                  '/dashboard/services'
                ]);

              },

              error: (err) => {

                console.error(err);

                this.loading = false;

                this.toastr.error(
                  'Failed to create service',
                  'Error'
                );

              }

            });

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.toastr.error(
            'Image upload failed',
            'Error'
          );

        }

      });

  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/services'
    ]);

  }

}