import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

import { adminTokenInterceptor } from './interceptors/admin-token-interceptor';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),

    provideHttpClient(withInterceptors([adminTokenInterceptor])),

    provideAnimations(),

    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
    }),
  ],
};
