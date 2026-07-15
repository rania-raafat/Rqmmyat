import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { register } from 'swiper/element/bundle';
import { ProjectsService } from '../../../services/projects/projects';
import { Project } from '../../../models/project';

register();

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Projects implements OnInit {

  projects: Project[] = [];

  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  constructor(
    private projectsService: ProjectsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  prevSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slidePrev();
  }

  nextSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slideNext();
  }

  loadProjects(): void {

    this.projectsService.getProjects().subscribe({
      next: (data) => {

        this.projects = data.filter(project => project.featured);

        console.log('Projects loaded:', this.projects);

        // Force Angular UI refresh
        this.cdr.detectChanges();

        // Update Swiper after rendering
        setTimeout(() => {
          this.swiperRef?.nativeElement?.swiper?.update();
        }, 100);

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

}