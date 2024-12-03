import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, DragDropModule, HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'source';
  apiUrl = 'http://localhost:3000/api/v1/climate/weather';

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {

    this.httpClient.get<any>(this.apiUrl).subscribe(
      ({data}) => console.log(data)
    );
  }
}
