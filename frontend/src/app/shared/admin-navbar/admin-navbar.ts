import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbar {

  @Output()
  toggleSidebar =
    new EventEmitter<void>();

  adminName = 'Admin';

  constructor(
    private router: Router
  ) {

    const admin =
      sessionStorage.getItem('admin');

    if (admin) {

      this.adminName =
        JSON.parse(admin).name ||
        'Admin';

    }

  }

  logout() {

    sessionStorage.clear();

    this.router.navigate(
      ['/admin']
    );

  }

}