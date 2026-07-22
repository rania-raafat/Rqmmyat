import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ServicesService } from '../../services/services/services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isMobileMenuOpen = false;
  showServices = false;

  services: any[] = [];

  constructor(
    private servicesService: ServicesService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;

        console.log('Navbar Services:', this.services);

        // Force UI update
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.showServices = false;
  }
}
