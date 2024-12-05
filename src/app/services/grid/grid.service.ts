import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CellService } from '../cell/cell.service';
import { forkJoin, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  private gridApiUrl = 'http://localhost:3000/grid';

  constructor(
    private cellService: CellService,
    private httpClient: HttpClient
  ) { }

  getGrids() {
    return this.httpClient.get<any>(this.gridApiUrl);
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
            cells: createdCells.map((cell: any) => cell.code)
          }
        })
      })
    );
  }

  deleteGrid(id: any) {
    return this.httpClient.delete<any>(this.gridApiUrl + '?id=' + id);
  }
}
