import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { ProjectsService } from '../../../../../services/projects/projects';

import { Project } from '../../../../../models/project';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-project.html',
  styleUrl: './edit-project.css',
})
export class EditProject implements OnInit {
  projectForm!: FormGroup;

  projectId = '';

  imagePreview: string | null = null;

  selectedFile: File | null = null;

  currentImage = '';

  loading = false;

  constructor(
    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private projectsService: ProjectsService,

    private toastr: ToastrService,

    private cd: ChangeDetectorRef,
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],

      category: ['', Validators.required],

      shortDescription: [''],

      status: ['Completed'],

      featured: [false],
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    this.loadProject();
  }

  loadProject(): void {
    this.projectsService.getProject(this.projectId).subscribe({
      next: (project: any) => {
        this.currentImage = project.image;

        this.imagePreview = project.image;

        this.projectForm.patchValue({
          title: project.title,

          category: project.category,

          shortDescription: project.shortDescription,

          status: project.status,

          featured: project.featured,
        });

        this.cd.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.toastr.error('Failed to load project');
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

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.toastr.warning('Please complete required fields');

      return;
    }

    this.loading = true;

    const updateProject = (imageUrl: string) => {
      const projectData: Project = {
        title: this.projectForm.value.title,

        category: this.projectForm.value.category,

        shortDescription: this.projectForm.value.shortDescription,

        status: this.projectForm.value.status,

        image: imageUrl,

        featured: this.projectForm.value.featured,
      };

      this.projectsService.updateProject(this.projectId, projectData).subscribe({
        next: () => {
          this.loading = false;

          this.toastr.success('Project updated successfully');

          this.router.navigate(['/dashboard/projects']);
        },

        error: (err) => {
          console.error(err);

          this.loading = false;

          this.toastr.error('Failed to update project');
        },
      });
    };

    if (this.selectedFile) {
      const formData = new FormData();

      formData.append('image', this.selectedFile);

      this.projectsService.uploadImage(formData).subscribe({
        next: (res: any) => {
          updateProject(res.url);
        },

        error: () => {
          this.loading = false;

          this.toastr.error('Image upload failed');
        },
      });
    } else {
      updateProject(this.currentImage);
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/projects']);
  }
}
