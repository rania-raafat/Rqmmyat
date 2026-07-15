import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { Team } from '../../../../models/team';

import { TeamService } from '../../../../services/team/team';

@Component({
  selector: 'app-admin-team',

  standalone: true,

  imports: [CommonModule, RouterLink],

  templateUrl: './admin-team.html',

  styleUrl: './admin-team.css',
})
export class AdminTeam implements OnInit {
  team: Team[] = [];

  loading = true;

  showDeleteModal = false;

  selectedTeamId = '';

  isAdmin = false;

  constructor(
    private teamService: TeamService,

    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('role') === 'super_admin';

    this.loadTeam();
  }

  loadTeam(): void {
    this.teamService

      .getTeams()

      .subscribe({
        next: (data: Team[]) => {
          this.team = [...data];

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
    this.selectedTeamId = id;

    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;

    this.selectedTeamId = '';
  }

  confirmDelete(): void {
    this.teamService

      .deleteTeam(this.selectedTeamId)

      .subscribe({
        next: () => {
          this.closeDeleteModal();

          this.loadTeam();
        },

        error: (err) => {
          console.error(err);
        },
      });
  }
}
