import { InjectionToken } from '@angular/core';
import { AppConfig } from './appconfig.interface';
import { environment } from '../../environments/environment';

// Below is created a injection token for a value provider.
export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

//  Below is a value provider.
export const APP_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint,
};
