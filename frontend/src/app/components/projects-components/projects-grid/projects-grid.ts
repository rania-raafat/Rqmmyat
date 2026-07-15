import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Project } from '../../../models/project';

import { ProjectsService } from '../../../services/projects/projects';

@Component({
  selector: 'app-projects-grid',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './projects-grid.html',

  styleUrl: './projects-grid.css',
})
export class ProjectsGridComponent implements OnInit {
  projects: Project[] = [];

  filteredProjects: Project[] = [];

  categories: string[] = ['All'];

  selectedCategory = 'All';

  currentPage = 1;

  projectsPerPage = 6;

  totalPages = 0;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectsService
      .getProjects()

      .subscribe({
        next: (data) => {
          this.projects = data;

          this.filteredProjects = data;

          this.categories = ['All', ...new Set(data.map((project) => project.category))];

          this.calculatePages();
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;

    this.currentPage = 1;

    if (category === 'All') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter((project) => project.category === category);
    }

    this.calculatePages();
  }

  get paginatedProjects(): Project[] {
    const start = (this.currentPage - 1) * this.projectsPerPage;

    return this.filteredProjects.slice(
      start,

      start + this.projectsPerPage,
    );
  }

  calculatePages(): void {
    this.totalPages = Math.ceil(this.filteredProjects.length / this.projectsPerPage);
  }

  get pages(): number[] {
    return Array.from(
      {
        length: this.totalPages,
      },

      (_, index) => index + 1,
    );
  }

  changePage(page: number): void {
    // save current scroll position

    const currentScroll = window.scrollY;

    // change page content

    this.currentPage = page;

    // restore same position after Angular update

    setTimeout(() => {
      window.scrollTo({
        top: currentScroll,

        behavior: 'auto',
      });
    }, 0);
  }
}
