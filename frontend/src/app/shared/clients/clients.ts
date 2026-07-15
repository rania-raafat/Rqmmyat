import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { register } from 'swiper/element/bundle';
import { ClientsService } from '../../services/clients/clients';

register();

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Clients implements OnInit {

  clients: any[] = [];

  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  constructor(
    private clientsService: ClientsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {

    this.clientsService.getClients().subscribe({
      next: (data) => {

        this.clients = data;

        console.log('Clients:', this.clients);

        this.cdr.detectChanges();

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