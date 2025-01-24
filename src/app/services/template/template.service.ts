import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { GridService } from '../grid/grid.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  private templateApiUrl = 'http://localhost:8000/api/v1/layout/template/';

  constructor(
    private gridService: GridService,
    private httpClient: HttpClient
  ) { }

  getTemplates() {
    return this.httpClient.get<any>(this.templateApiUrl);
  }

  getTemplateById(id: any) {
    return this.httpClient.get<any>(this.templateApiUrl + 'get_by_id/' + id + '/');
  }

  createTemplate(name: any, cells: any) {

    return this.gridService.createGrid(name, cells).pipe(
      switchMap((createdGrid) => {
        return this.httpClient.post<any>(this.templateApiUrl + 'create/', {
          name,
          grids: [createdGrid.id]
        })
      })
    );
  }

  deleteTemplate(id: any) {
    return this.httpClient.delete<any>(this.templateApiUrl + 'delete_by_id/' + id + '/');
  }
}
