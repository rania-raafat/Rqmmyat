import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Service } from '../../models/service';
import { ServicesService } from '../../services/services/services';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {

  services: Service[] = [];

  constructor(
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  private loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = res.slice(0, 6);
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }
}