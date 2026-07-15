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
import { ServicesService } from '../../../services/services/services';
import { Service } from '../../../models/service';
register();

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Services implements OnInit {

  services: Service[] = [];

  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  prevSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slidePrev();
  }

  nextSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slideNext();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {

        this.services = data.slice(0, 5);

        console.log('Services loaded:', this.services);

        // Force Angular to refresh the UI
        this.cdr.detectChanges();

        // Update swiper after data is rendered
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