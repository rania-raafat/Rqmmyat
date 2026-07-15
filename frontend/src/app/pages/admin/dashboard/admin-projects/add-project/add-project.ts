import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ProjectsService } from '../../../../../services/projects/projects';
import { Project } from '../../../../../models/project';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  projectForm!: FormGroup;

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private projectsService: ProjectsService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],

      category: ['', Validators.required],

      shortDescription: [''],

      status: ['Active'],

      featured: [false],
    });
  }

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;

      this.cd.detectChanges();
    };

    reader.readAsDataURL(this.selectedFile);
  }

  saveProject(): void {
    if (this.projectForm.invalid || !this.selectedFile) {
      this.toastr.warning('Please fill all required fields and select image');

      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('image', this.selectedFile);

    this.projectsService.uploadImage(formData).subscribe({
      next: (uploadRes: any) => {
        const projectData: Project = {
          title: this.projectForm.value.title,

          category: this.projectForm.value.category,

          shortDescription: this.projectForm.value.shortDescription,

          status: this.projectForm.value.status,

          featured: this.projectForm.value.featured,

          image: uploadRes.url,
        };

        this.projectsService.createProject(projectData).subscribe({
          next: () => {
            this.loading = false;

            this.toastr.success('Project created successfully');

            this.router.navigate(['/dashboard/projects']);
          },

          error: () => {
            this.loading = false;

            this.toastr.error('Failed to create project');
          },
        });
      },

      error: () => {
        this.loading = false;

        this.toastr.error('Image upload failed');
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/dashboard/projects']);
  }
}
