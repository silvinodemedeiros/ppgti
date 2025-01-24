import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from './services/weather/weather.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptor } from './services/core/jwt/jwt.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    DragDropModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'source';
  subscription = new Subscription();

  constructor(
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {

    const sub = this.weatherService.getWeather().subscribe(console.log);

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
