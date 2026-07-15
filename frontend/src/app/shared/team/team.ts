import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { register } from 'swiper/element/bundle';

import { TeamService } from '../../services/team/team';

import { Team } from '../../models/team';

register();

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamComponent implements OnInit {

  members: Team[] = [];

  @ViewChild('swiperRef')
  swiperRef!: ElementRef;

  constructor(
    private teamService: TeamService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {

    this.teamService.getTeams().subscribe({

      next: (data) => {

        this.members = data;

        this.cdr.detectChanges();

        setTimeout(() => {
          this.swiperRef?.nativeElement?.swiper?.update();
        }, 100);

      },

      error: (err) => {
        console.error(err);
      }

    });

  }

  prevSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slidePrev();
  }

  nextSlide(): void {
    this.swiperRef?.nativeElement?.swiper?.slideNext();
  }

}