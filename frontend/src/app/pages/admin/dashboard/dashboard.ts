import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AdminSidebar } from '../../../shared/admin-sidebar/admin-sidebar';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AdminSidebar,
    AdminNavbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  sidebarOpen = false;

  toggleSidebar() {

    this.sidebarOpen =
      !this.sidebarOpen;

  }

}