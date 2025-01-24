import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  cellUrl = 'http://localhost:8000/api/v1/layout/cell/';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCellById(id: any) {
    return this.httpClient.get<any>(this.cellUrl + 'get_by_id/' + id + '/');
  }

  createCell(data: any) {
    const { row_start, column_start, row_end, column_end, widget } = data;
    let payload = {
      row_start,
      column_start,
      row_end,
      column_end,
      widget
    };

    if (widget) {
      payload.widget = widget.id;
    } else {
      delete payload.widget;
    }
    
    return this.httpClient.post<any>(this.cellUrl + 'create/', payload);
  }
}
