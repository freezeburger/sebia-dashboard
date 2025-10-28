import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../router/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NotificationRefactor } from '../pages/notifcation/services/notification.refactor';
import { NotificationService } from '../pages/notifcation/services/notification.service';


export const appConfig: ApplicationConfig = {
  providers: [
    /* { provide: 'API_BASE_URL', useValue: 'http://localhost:5050' }, */
    { provide: NotificationService, useClass: NotificationRefactor },
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
