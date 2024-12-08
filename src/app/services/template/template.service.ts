import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { GridService } from '../grid/grid.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateApiUrl = 'http://localhost:3000/template';

  constructor(
    private gridService: GridService,
    private httpClient: HttpClient
  ) { }

  getTemplates() {
    return this.httpClient.get<any>(this.templateApiUrl).pipe(
      map(({data}) => data)
    );
  }

  getTemplateById(id: any) {
    return this.httpClient.get<any>(this.templateApiUrl + '?id=' + id).pipe(
      map(({data}) => data)
    );
  }

  createTemplate(name: any, cells: any) {

    return this.gridService.createGrid(name, cells).pipe(
      switchMap((createdGrid) => {
        return this.httpClient.post<any>(this.templateApiUrl, {
          data: {
            name,
            grids: [createdGrid.data.id]
          }
        })
      })
    );
  }

  deleteTemplate(id: any) {
    return this.httpClient.delete<any>(this.templateApiUrl + '?id=' + id);
  }
}
