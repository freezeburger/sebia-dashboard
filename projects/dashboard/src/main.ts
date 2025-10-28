import { bootstrapApplication } from '@angular/platform-browser';

import { appConfig } from '@dashboard/app/config/app.config';
import { App } from '@dashboard/app/root/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
