import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  private widgetApiUrl = 'http://localhost:3000/widgets';

  constructor(private httpClient: HttpClient) { }

  getWidgets() {
    return this.httpClient.get<any>(this.widgetApiUrl);
  }

  createWidget(data: any) {
    return this.httpClient.post<any>(this.widgetApiUrl + '/create/', data);
  }

  deleteWidget(id: any) {
    return this.httpClient.delete<any>(this.widgetApiUrl + '/delete?id=' + id);
  }
}
