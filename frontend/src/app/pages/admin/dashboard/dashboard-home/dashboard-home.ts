import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AdminDashboardStatsService
}
from '../../../../services/admin-dashboard-stats/admin-dashboard-stats';
import { DashboardStats } from './../../../../models/dashboard-stats';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})

export class DashboardHome implements OnInit {

  stats!: DashboardStats;

  loading = true;

  constructor(
    private dashboardStatsService:
    AdminDashboardStatsService,

    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.loadStats();

  }

  loadStats(): void {

    this.dashboardStatsService
      .getStats()
      .subscribe({

        next: (data: any) => {

          console.log(data);

          this.stats = {
            ...data
          };

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

        }

      });

  }

}