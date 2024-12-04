import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private gridApiUrl = 'http://localhost:3000/grids';

  constructor(private httpClient: HttpClient) { }

  getGrids() {
    return this.httpClient.get<any>(this.gridApiUrl);
  }

  createGrid(data: any) {
    return this.httpClient.post<any>(this.gridApiUrl + '/create/', data);
  }

  deleteGrid(id: any) {
    return this.httpClient.delete<any>(this.gridApiUrl + '/delete?id=' + id);
  }
}
