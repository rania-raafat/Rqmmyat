import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Contact } from '../../../../models/contact';

import { ContactsService } from '../../../../services/contacts/contacts';

@Component({
  selector: 'app-admin-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-contacts.html',
  styleUrl: './admin-contacts.css',
})
export class AdminContacts implements OnInit {
  contacts: Contact[] = [];

  loading = true;

  showDeleteModal = false;

  selectedContactId = '';

  isAdmin = false;

  statuses = ['New', 'Contacted', 'In Progress', 'Closed'];

  constructor(
    private contactsService: ContactsService,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'super_admin';

    this.loadContacts();
  }

  loadContacts(): void {
    this.contactsService.getContacts().subscribe({
      next: (data: Contact[]) => {
        this.contacts = [...data];

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
  selectedMessage = '';

  showMessageModal = false;

  openMessage(message: string): void {
    this.selectedMessage = message;
    this.showMessageModal = true;
  }

  closeMessageModal(): void {
    this.showMessageModal = false;
  }
  openDeleteModal(id: string): void {
    this.selectedContactId = id;

    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;

    this.selectedContactId = '';
  }

  confirmDelete(): void {
    this.contactsService.deleteContact(this.selectedContactId).subscribe({
      next: () => {
        this.closeDeleteModal();

        this.loadContacts();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }

  changeStatus(contact: Contact, event: Event): void {
    const status = (event.target as HTMLSelectElement).value;

    const updatedContact: Contact = {
      ...contact,

      status,
    };

    this.contactsService.updateContact(contact._id!, updatedContact).subscribe({
      next: () => {
        contact.status = status;
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
