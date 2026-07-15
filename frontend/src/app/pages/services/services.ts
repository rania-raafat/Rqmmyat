import { Component } from '@angular/core';
import { ServicesPage } from '../../components/services-components/services-page/services-page';
import { Navbar } from '../../shared/navbar/navbar';
import { CtaComponent } from '../../shared/cta/cta';
import { Footer } from '../../shared/footer/footer';
@Component({
  selector: 'app-services',
  imports: [ServicesPage, Navbar, Footer, CtaComponent],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {}
