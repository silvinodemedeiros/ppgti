import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenApiUrl = 'http://localhost:3000/auth/access-token';
  private generateTokenApiUrl = 'http://localhost:3000/auth/generate-token';
  private signupApiUrl = 'http://localhost:3000/auth/signup';

  private _accessToken = null;
  private _refreshToken = null;

  constructor(
    private httpClient: HttpClient
  ) { }

  signup(data: any) {
    const {username, email, password} = data;

    return this.httpClient.post<any>(this.signupApiUrl, {
      data: {
        nome: username,
        email,
        password
      }
    }).pipe(
      switchMap((c) => {
        return of({...c.data})
      })
    );
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>(this.generateTokenApiUrl, {
      data: {
        email, password
      }
    }).pipe(
      switchMap((res) => {
        const {refresh, access} = res.data;
        this._accessToken = access;
        this._refreshToken = refresh;

        return of(null);
      })
    );
  }

  getAccessToken() {
    return this._accessToken;
  }

  getRefreshToken() {
    return this._refreshToken;
  }

  
}
