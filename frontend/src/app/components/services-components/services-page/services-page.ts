import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { register } from 'swiper/element/bundle';

import { ServicesService } from '../../../services/services/services';

import { Service } from '../../../models/service';

register();

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicesPage implements OnInit {
  services: Service[] = [];

  activeIndex = 0;

  currentService!: Service;

  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;

        if (this.services.length) {
          this.currentService = this.services[0];
        }

        this.cdr.detectChanges();

        setTimeout(() => {
          const swiper = this.swiperRef.nativeElement.swiper;

          swiper.updateAutoHeight();

          swiper.on('slideChange', () => {
            this.activeIndex = swiper.activeIndex;

            this.currentService = this.services[this.activeIndex];

            this.cdr.detectChanges();
          });

          this.listenToFragment();
        }, 300);
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  private listenToFragment(): void {
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;

      const index = this.services.findIndex((service) => service.slug === fragment);

      if (index === -1) return;

      const swiper = this.swiperRef?.nativeElement?.swiper;

      if (!swiper) return;

      swiper.slideTo(index);

      this.activeIndex = index;

      this.currentService = this.services[index];

      this.cdr.detectChanges();
    });
  }

  previousService(): void {
    this.swiperRef?.nativeElement?.swiper?.slidePrev();
  }

  nextService(): void {
    this.swiperRef?.nativeElement?.swiper?.slideNext();
  }
}
