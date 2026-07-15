import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { ContactForm } from '../../components/contact-components/contact-form/contact-form';
import { ContactHero } from '../../components/contact-components/contact-hero/contact-hero';
@Component({
  selector: 'app-contact',
  imports: [ContactForm, Footer, Navbar, ContactHero],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {}
