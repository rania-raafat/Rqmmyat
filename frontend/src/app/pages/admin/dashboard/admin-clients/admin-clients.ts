import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { Client } from '../../../../models/client';

import { ClientsService } from '../../../../services/clients/clients';

@Component({
  selector: 'app-admin-clients',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-clients.html',
  styleUrl: './admin-clients.css',
})
export class AdminClients implements OnInit {
  clients: Client[] = [];

  loading = true;

  showDeleteModal = false;

  selectedClientId = '';

  isAdmin = false;

  constructor(
    private clientsService: ClientsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'super_admin';

    this.loadClients();
  }

  loadClients(): void {
    this.clientsService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = [...data];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  openDeleteModal(id: string): void {
    this.selectedClientId = id;

    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;

    this.selectedClientId = '';
  }

  confirmDelete(): void {
    this.clientsService.deleteClient(this.selectedClientId).subscribe({
      next: () => {
        this.closeDeleteModal();

        this.loadClients();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
