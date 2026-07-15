import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  Project
} from '../../../../models/project';

import {
  ProjectsService
} from '../../../../services/projects/projects';

@Component({
  selector: 'app-admin-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './admin-projects.html',
  styleUrl: './admin-projects.css'
})
export class AdminProjects implements OnInit {

  projects: Project[] = [];

  loading = true;

  showDeleteModal = false;

  selectedProjectId = '';

  isAdmin = false;

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.isAdmin =
      sessionStorage.getItem('role') === 'super_admin';

    this.loadProjects();

  }

  loadProjects(): void {

    this.projectsService
      .getProjects()
      .subscribe({

        next: (data: Project[]) => {

          this.projects = [...data];

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }

  openDeleteModal(id: string): void {

    this.selectedProjectId = id;

    this.showDeleteModal = true;

  }

  closeDeleteModal(): void {

    this.showDeleteModal = false;

    this.selectedProjectId = '';

  }

  confirmDelete(): void {

    this.projectsService
      .deleteProject(this.selectedProjectId)
      .subscribe({

        next: () => {

          this.closeDeleteModal();

          this.loadProjects();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}