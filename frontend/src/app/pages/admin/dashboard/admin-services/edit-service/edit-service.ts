import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  ToastrService
} from 'ngx-toastr';

import {
  ServicesService
} from '../../../../../services/services/services';

import {
  Service,
  SubService
} from '../../../../../models/service';

@Component({
  selector: 'app-edit-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-service.html',
  styleUrl: './edit-service.css'
})
export class EditService implements OnInit {

  serviceForm!: FormGroup;

  serviceId = '';

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  currentImage = '';

  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicesService: ServicesService,
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

  ngOnInit(): void {

    this.serviceId =
      this.route.snapshot.paramMap.get('id') || '';

    this.loadService();

  }

  get subServices(): FormArray {

    return this.serviceForm.get(
      'subServices'
    ) as FormArray;

  }

  createSubServiceGroup(
    sub?: SubService
  ): FormGroup {

    return this.fb.group({

      title: [
        sub?.title || '',
        Validators.required
      ],

      description: [
        sub?.description || ''
      ],

      features: this.fb.array(

        (sub?.features || []).map(
          feature => this.fb.control(feature)
        )

      )

    });

  }

  addSubService(): void {

    this.subServices.push(
      this.createSubServiceGroup()
    );

  }

  removeSubService(index: number): void {

    this.subServices.removeAt(index);

  }

  getFeatures(index: number): FormArray {

    return this.subServices
      .at(index)
      .get('features') as FormArray;

  }

  addFeature(index: number): void {

    this.getFeatures(index).push(
      this.fb.control('')
    );

  }

  removeFeature(
    subIndex: number,
    featureIndex: number
  ): void {

    this.getFeatures(subIndex)
      .removeAt(featureIndex);

  }

  loadService(): void {

    this.servicesService
      .getService(this.serviceId)
      .subscribe({

        next: (service: any) => {

          this.currentImage =
            service.image;

          this.imagePreview =
            service.image;

          this.serviceForm.patchValue({

            title:
              service.title,

            shortDescription:
              service.shortDescription,

            description:
              service.description

          });

          this.subServices.clear();

          service.subServices?.forEach(

            (sub: SubService) => {

              this.subServices.push(
                this.createSubServiceGroup(sub)
              );

            }

          );

          if (
            !service.subServices ||
            service.subServices.length === 0
          ) {

            this.addSubService();

          }

          this.cd.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.toastr.error(
            'Failed to load service'
          );

        }

      });

  }

  onImageSelect(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    if (!input.files?.length) {

      return;

    }

    this.selectedFile =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

      this.cd.detectChanges();

    };

    reader.readAsDataURL(
      this.selectedFile
    );

  }

  saveService(): void {

    if (this.serviceForm.invalid) {

      this.toastr.warning(
        'Please complete all required fields'
      );

      return;

    }

    this.loading = true;

    const updateService =
      (imageUrl: string) => {

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
            imageUrl,

          subServices:
            this.serviceForm.value.subServices

        };

        this.servicesService
          .updateService(
            this.serviceId,
            serviceData
          )
          .subscribe({

            next: () => {

              this.loading = false;

              this.toastr.success(
                'Service updated successfully'
              );

              this.router.navigate([
                '/dashboard/services'
              ]);

            },

            error: (err) => {

              console.error(err);

              this.loading = false;

              this.toastr.error(
                'Failed to update service'
              );

            }

          });

      };

    if (this.selectedFile) {

      const formData =
        new FormData();

      formData.append(
        'image',
        this.selectedFile
      );

      this.servicesService
        .uploadImage(formData)
        .subscribe({

          next: (res: any) => {

            updateService(
              res.url
            );

          },

          error: () => {

            this.loading = false;

            this.toastr.error(
              'Image upload failed'
            );

          }

        });

    }

    else {

      updateService(
        this.currentImage
      );

    }

  }

  cancel(): void {

    this.router.navigate([
      '/dashboard/services'
    ]);

  }

}