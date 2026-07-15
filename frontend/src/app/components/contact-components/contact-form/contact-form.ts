import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { Contact } from '../../../models/contact';

import { Service } from '../../../models/service';

import { ContactsService } from '../../../services/contacts/contacts';

import { ServicesService } from '../../../services/services/services';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm implements OnInit {

  contactForm!: FormGroup;

  services: Service[] = [];

  loading = false;

  constructor(
    private fb: FormBuilder,
    private contactsService: ContactsService,
    private servicesService: ServicesService,
    private toastr: ToastrService,
  ) {

    this.contactForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{11}$')
        ]
      ],

      company: [
        '',
        [
          Validators.minLength(2)
        ]
      ],

      service: [
        '',
        Validators.required
      ],

      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000)
        ]
      ]

    });

  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {

    this.servicesService
      .getServices()
      .subscribe({

        next: (data: Service[]) => {

          this.services = data;

        },

        error: (err) => {

          console.error(err);

          this.toastr.error(
            'Failed to load services'
          );

        }

      });

  }

  sendMessage(): void {

    if (this.contactForm.invalid) {

      this.contactForm.markAllAsTouched();

      this.toastr.warning(
        'Please fix validation errors'
      );

      return;

    }

    this.loading = true;

    const contactData: Contact = {

      name: this.contactForm.value.name,

      email: this.contactForm.value.email,

      phone: this.contactForm.value.phone,

      company: this.contactForm.value.company,

      service: this.contactForm.value.service,

      message: this.contactForm.value.message,

      status: 'new',

    };

    this.contactsService
      .createContact(contactData)
      .subscribe({

        next: () => {

          this.loading = false;

          this.toastr.success(
            'Message sent successfully'
          );

          this.contactForm.reset();

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.toastr.error(
            'Failed to send message'
          );

        }

      });

  }

  /* =========================
     GETTERS
  ========================= */

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get company() {
    return this.contactForm.get('company');
  }

  get service() {
    return this.contactForm.get('service');
  }

  get message() {
    return this.contactForm.get('message');
  }

}