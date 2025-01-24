import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { jwtInterceptorFn } from './services/core/jwt/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    provideHttpClient(withInterceptors([jwtInterceptorFn])),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService 
  ]
};
