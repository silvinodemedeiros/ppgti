import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap, of, catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private timeout: any;  // Timer para detectar inatividade

  private tokenApiUrl = 'http://localhost:8000/token/';
  private refreshTokenApiUrl = 'http://localhost:8000/token/refresh/';
  private signupApiUrl = 'http://localhost:8000/register/';

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  signup(data: any) {
    const { username, email, password } = data;

    return this.httpClient.post<any>(this.signupApiUrl, {
      data: {
        nome: username,
        email,
        password
      }
    }).pipe(
      switchMap((c) => {
        return of({ ...c.data })
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.tokenApiUrl, {
      data: { email, password }
    }).pipe(
      map((res: any) => {
        console.log(res);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        this.startSessionTimeout();
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    clearTimeout(this.timeout);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      this.logout();
      return of(null);
    }

    return this.httpClient.post(this.refreshTokenApiUrl, { refresh: refreshToken }).pipe(
      map((res: any) => {
        localStorage.setItem('access_token', res.data.access);
        this.startSessionTimeout();
        return res;
      }),
      catchError(() => {
        this.logout();
        return of(null);
      })
    );
  }

  startSessionTimeout(): void {
    clearTimeout(this.timeout);  // Reinicia o contador de inatividade

    // Após 55 minutos de inatividade, tenta renovar o token
    this.timeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, 55 * 60 * 1000);

    // Após 1 hora de inatividade, desloga o usuário
    setTimeout(() => {
      this.logout();
    }, 60 * 60 * 1000);
  }


}
