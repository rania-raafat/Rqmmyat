import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  @Input()
  sidebarOpen = false;

  @Output()
  closeSidebar = new EventEmitter<void>();

  onLinkClick(): void {
    if (window.innerWidth < 992) {
      this.closeSidebar.emit();
    }
  }
}
