import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ScrollTopComponent } from './shared/scroll-top/scroll-top';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ScrollTopComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  constructor(
    private router: Router
  ) {

    this.router.events
      .pipe(
        filter(
          event => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {

        const isDashboardRoute =
          event.urlAfterRedirects.startsWith(
            '/dashboard'
          );

        if (!isDashboardRoute) {

          sessionStorage.clear();

        }

      });

  }

}