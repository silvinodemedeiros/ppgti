import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private jwtHelper: JwtHelperService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();

        if (token) {
            const isExpired = this.jwtHelper.isTokenExpired(token);
            
            if (isExpired) {
                this.authService.refreshToken().subscribe();
            }

            req = req.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`
              }
            });
        }

        return next.handle(req);
    }
}

export const jwtInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const _authService = inject(AuthService);
  const _jwtHelper = inject(JwtHelperService);
  const token = _authService.getToken();

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(clonedRequest);
};