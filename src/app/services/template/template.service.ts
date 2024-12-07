import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() { }

  getTemplates() {
    return of({data: []}).pipe(
      map(widgetList => widgetList.data)
    );
  }
}
