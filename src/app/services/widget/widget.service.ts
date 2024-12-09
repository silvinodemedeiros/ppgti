import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private widgetApiUrl = 'http://localhost:3000/widget';

  constructor(private httpClient: HttpClient) { }

  getWidgets() {
    return this.httpClient.get<any>(this.widgetApiUrl).pipe(
      map(widgetList => widgetList.data)
    );
  }

  getWidgetById(id: any) {
    return this.httpClient.get<any>(this.widgetApiUrl + '?id=' + id).pipe(
      map(widgetList => widgetList.data)
    );
  }

  createWidget(data: any) {
    return this.httpClient.post<any>(this.widgetApiUrl, data);
  }

  deleteWidget(id: any) {
    return this.httpClient.delete<any>(this.widgetApiUrl + '?id=' + id);
  }
}
