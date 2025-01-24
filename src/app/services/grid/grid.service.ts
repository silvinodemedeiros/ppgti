import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CellService } from '../cell/cell.service';
import { forkJoin, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private gridApiUrl = 'http://localhost:8000/api/v1/layout/grid/';

  constructor(
    private cellService: CellService,
    private httpClient: HttpClient
  ) { }

  getGrids() {
    return this.httpClient.get<any>(this.gridApiUrl);
  }

  getGridById(id: any) {
    return this.httpClient.get<any>(this.gridApiUrl + '/get_by_id/' + id + '/');
  }

  createGrid(name: any, cells: any) {

    const cellRequests = cells.map((cell: any) => {
      return this.cellService.createCell({...cell}).pipe(
        switchMap((c) => {
          return of({...c.data})
        })
      );
    }) as any[];

    return forkJoin(...cellRequests).pipe(
      switchMap((createdCells) => {
        return this.httpClient.post<any>(this.gridApiUrl, {
          data: {
            name,
            cells: createdCells.map((cell: any) => cell.id)
          }
        })
      })
    );
  }

  deleteGrid(id: any) {
    return this.httpClient.delete<any>(this.gridApiUrl + '?id=' + id);
  }
}
