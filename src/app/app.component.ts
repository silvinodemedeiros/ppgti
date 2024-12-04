import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherService } from './services/weather/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, DragDropModule, HttpClientModule
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

    const sub = this.weatherService.getWeather().subscribe(
      ({data}) => console.log(data)
    );

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
