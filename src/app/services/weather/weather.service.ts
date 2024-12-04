import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  weatherUrl = 'http://localhost:3000/weather';

  constructor(
    private httpClient: HttpClient
  ) { }

  getWeather() {
    return this.httpClient.get<any>(this.weatherUrl);
  }
}
