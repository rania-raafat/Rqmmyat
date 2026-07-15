import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule }
from '@angular/common';
import { Service } from '../../../../models/service';
import {
  ServicesService
}
from '../../../../services/services/services';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-services.html',
  styleUrl: './admin-services.css'
})
export class AdminServices implements OnInit {

  services: Service[] = [];

  loading = true;

  showDeleteModal = false;

  selectedServiceId = '';
 
  isAdmin = false;
  constructor(
    private adminServices: ServicesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.isAdmin =
    sessionStorage.getItem('role') === 'super_admin';

    this.loadServices();

  }

  loadServices(): void {

    this.adminServices
      .getServices()
      .subscribe({

        next: (data: Service[]) => {

          this.services = [...data];

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

    this.selectedServiceId = id;

    this.showDeleteModal = true;

  }

  closeDeleteModal(): void {

    this.showDeleteModal = false;

    this.selectedServiceId = '';

  }

  confirmDelete(): void {

    this.adminServices
      .deleteService(this.selectedServiceId)
      .subscribe({

        next: () => {

          this.closeDeleteModal();

          this.loadServices();

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}