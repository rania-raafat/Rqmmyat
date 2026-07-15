import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Hero } from '../../components/home-components/hero/hero';
import { About } from '../../components/home-components/about/about';
import { Services } from "../../components/home-components/services/services";
import { WhyChooseUs } from '../../components/home-components/why-choose-us/why-choose-us';
import { Projects } from '../../components/home-components/projects/projects';
import { TeamComponent } from '../../shared/team/team';
import { TestimonialsComponent } from '../../shared/testimonials/testimonials';
import { Clients} from '../../shared/clients/clients';
import { CtaComponent } from '../../shared/cta/cta'
import { Footer } from "../../shared/footer/footer";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Services, CtaComponent,  WhyChooseUs, Projects, Clients, Footer, Navbar, TeamComponent, TestimonialsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}