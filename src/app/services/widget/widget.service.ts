import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  widgetApiUrl = 'http://localhost:8000/api/v1/layout/widget/';
  constructor(private httpClient: HttpClient) { }

  getWidgets() {
    return this.httpClient.get<any>(this.widgetApiUrl);
  }

  getWidgetById(id: any) {
    return this.httpClient.get<any>(this.widgetApiUrl + '?id=' + id).pipe(
      map(widgetList => widgetList.data)
    );
  }

  createWidget(data: any) {
    return this.httpClient.post<any>(this.widgetApiUrl + '/create/', data);
  }

  deleteWidget(id: any) {
    return this.httpClient.delete<any>(this.widgetApiUrl + '/get_by_id/' + id + '/');
  }
}
