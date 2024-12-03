import { Component, OnDestroy, OnInit } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

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
  weatherUrl = 'http://localhost:3000/api/v1/climate/weather';
  subscription = new Subscription();

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {

    const sub = this.httpClient.get<any>(this.weatherUrl).subscribe(
      ({data}) => console.log(data)
    );

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
