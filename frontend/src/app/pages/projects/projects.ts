import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';
import { ProjectsHero } from '../../components/projects-components/projects-hero/projects-hero';
import { ProjectsGridComponent } from '../../components/projects-components/projects-grid/projects-grid';
import { CtaComponent } from '../../shared/cta/cta';
@Component({
  selector: 'app-projects',
  imports: [Navbar, Footer, ProjectsHero, ProjectsGridComponent, CtaComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {}
