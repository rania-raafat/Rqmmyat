import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-testimonials',

  standalone: true,

  imports: [CommonModule],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './testimonials.html',

  styleUrl: './testimonials.css',
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  testimonials = [
    {
      company: 'Canal Sugar',

      message:
        "Before partnering with RQMMYAT, our factory's manual visitor system created bottlenecks and inaccuracies. RQMMYAT integrated cutting-edge hardware with intuitive software, providing accurate real-time reports and improving security and operations.",
    },

    {
      company: 'City Stars Mall',

      message:
        'Our previous parking system caused congestion and complex revenue collection. The automated solution transformed parking operations with smooth vehicle flow, transparent payments, and improved customer experience.',
    },

    {
      company: 'JW Marriott Cairo',

      message:
        'RQMMYAT transformed our hotel experience with smart automation solutions, intuitive controls, faster check-ins, and seamless parking, elevating guest satisfaction.',
    },

    {
      company: 'PGESCO',

      message:
        "RQMMYAT's RFID solution transformed our asset management operations with accurate tracking, real-time visibility, and powerful reporting.",
    },
  ];

  ngAfterViewInit() {
    const swiper = this.swiperRef.nativeElement;

    Object.assign(swiper, {
      pagination: {
        clickable: true,
      },

      autoplay: {
        delay: 4000,

        disableOnInteraction: false,
      },
    });

    swiper.initialize();
  }
}
