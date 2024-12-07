import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl = 'http://localhost:3000/weather';

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeather() {
    return this.httpClient.get<any>(this.weatherUrl).pipe(
      map(weather => weather.data)
    );
  }
}
