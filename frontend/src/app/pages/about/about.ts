import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { AboutHero } from '../../components/about-components/about-hero/about-hero';
import { CompanyStory } from '../../components/about-components/company-story/company-story';
import { MissionVision } from '../../components/about-components/mission-vision/mission-vision';
import { TeamComponent } from '../../shared/team/team';
import { Clients } from '../../shared/clients/clients';
import { CtaComponent } from '../../shared/cta/cta';
@Component({
  selector: 'app-about',
  imports: [Navbar, Footer, AboutHero, CompanyStory, MissionVision,TeamComponent, Clients, CtaComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
