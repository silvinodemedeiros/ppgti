import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private widgetApiUrl = 'http://localhost:3000/widget';

  constructor(private httpClient: HttpClient) { }

  getWidgets() {
    return this.httpClient.get<any>(this.widgetApiUrl);
  }

  createWidget(data: any) {
    return this.httpClient.post<any>(this.widgetApiUrl, data);
  }

  deleteWidget(id: any) {
    return this.httpClient.delete<any>(this.widgetApiUrl + '?id=' + id);
  }
}
