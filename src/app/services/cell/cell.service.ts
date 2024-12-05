import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CellService {

  cellUrl = 'http://localhost:3000/cell';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCellById(id: any) {
    return this.httpClient.get<any>(this.cellUrl + '?id=' + id);
  }

  createCell(data: any) {
    const { rowStart, columnStart, rowEnd, columnEnd } = data;
    const payload = {
      row_start: rowStart,
      column_start: columnStart,
      row_end: rowEnd,
      column_end: columnEnd
    };
    
    return this.httpClient.post<any>(this.cellUrl, {
      data: payload
    });
  }
}
