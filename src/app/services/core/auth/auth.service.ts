import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signupApiUrl = 'http://localhost:3000/signup';

  constructor(
    private httpClient: HttpClient
  ) { }

  signup(data: any) {
    const {username, email, password} = data;

    return this.httpClient.post<any>(this.signupApiUrl, {
      data: {
        nome: username,
        email: email,
        password
      }
    }).pipe(
      switchMap((c) => {
        return of({...c.data})
      })
    );
  }
}
