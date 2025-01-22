import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { WidgetService } from '../services/widget/widget.service';
import { forkJoin, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';
import { GridService } from '../services/grid/grid.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { TemplateService } from '../services/template/template.service';
import { CellService } from '../services/cell/cell.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlHeaderComponent } from '../gl-core/gl-header/gl-header.component';

@Component({
  selector: 'app-gl',
  standalone: true,
  imports: [
    GlHeaderComponent,
    GlMenuComponent,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule
  ],
  exportAs: 'GlComponent',
  templateUrl: './gl.component.html',
  styleUrl: './gl.component.less'
})
export class GlComponent implements OnInit, OnDestroy {
  
  private _snackBar = inject(MatSnackBar);

  subscription = new Subscription();
  
  currentWeather: any;
  currentGrid: any;

  isListLoading = false;
  cells: any;

  form = this.fb.group({
    name: [null, Validators.required]
  });

  get widgets$(): Observable<any[]> {
    return this.widgetService.getWidgets();
  }

  get grids$(): any {
    return this.gridService.getGrids();
  }

  get templates$(): any {
    return this.templateService.getTemplates();
  }

  itemList$: Observable<any> = of(undefined);
  currentRoute: any;

  constructor(
    private widgetService: WidgetService,
    private gridService: GridService,
    private cellService: CellService,
    private templateService: TemplateService,
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.itemList$
    this.activatedRoute.url.subscribe((urlSegments) => {

      this.currentRoute = urlSegments.map((segment) => segment.path).join('/');

      if (this.currentRoute.includes('widgets')) {
        this.itemList$ = this.widgets$;
      } else if (this.currentRoute.includes('grids')) {
        this.itemList$ = this.grids$;
      } else if (this.currentRoute.includes('templates')) {
        this.itemList$ = this.templates$;
      }

      this.isListLoading = false;
    });

    const sub = this.weatherService.getWeather().subscribe(
      (response) => {
        this.currentWeather = response;
      }
    );

    this.cells = JSON.parse(localStorage.getItem('storedCells') as string);

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  store() {
    localStorage.setItem('storedCells', JSON.stringify(this.cells));
  }

  handleListItemClick(item: any) {
    if (this.currentRoute.includes('grids')) {
      this.assignGrid(item);
    } else if (this.currentRoute.includes('templates')) {
      this.assignTemplate(item);
    }
  }

  clearTemplate() {
    this.cells = [];
    localStorage.removeItem('storedCells');
  }

  assignGrid(grid: any) {
    const cellRequests = grid.cells.map((cellId: any) => {
      return this.cellService.getCellById(cellId);
    });

    forkJoin(cellRequests).subscribe((cellList: any) => {
      this.cells = cellList.map((cell: any) => ({
        ...cell,
        widget: null
      }));
      this.store();
    });
  }

  assignTemplate(template: any) {

    const gridSub = this.gridService.getGridById(template.grids[0]).subscribe((data) => {
      
      this.form.get('name')?.setValue(template.name);

      const templateGrid = data.filter((grid: any) => grid.id === template.grids[0])[0];

      const cellRequests = templateGrid.cells.map((cellId: any) => {
        return this.cellService.getCellById(cellId);
      });
  
      forkJoin(cellRequests).subscribe((cellList: any) => {
        this.cells = [...cellList];

        this.cells.forEach((cell: any, index: number) => {
          if (cell.widget) {
            this.widgetService.getWidgetById(cell.widget).subscribe((widget) => {

              const cellWidget = widget.filter((cw: any) => cw.id === cell.widget)[0]
              this.cells[index].widget = cellWidget;
            });
          }
        });

        this.store();
      });

    });

    this.subscription.add(gridSub);
  }

  removeWidget(cellIndex: any): void {
    this.cells = (this.cells as any[]).map((cell, index) => {
      if (index === cellIndex) {
        return {
          ...cell,
          widget: null
        };
      }

      return cell;
    });

    this.store();
  }

  saveTemplate() {
    console.log(this.form.value, this.cells);

    const sub = this.templateService.createTemplate(this.form.value.name, this.cells).subscribe(() => {

    
      this._snackBar.open('Template created successfully!', 'OK');
    });
  }



  onDragStart(ev: any, widget: any) {
    const widgetJson = JSON.stringify(widget);
    ev.dataTransfer.setData('text/plain', widgetJson);
  }

  onDragOver(ev: any) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  onDragEnter(ev: any) {
    ev.target.classList.add('gl-cell-hover');
  }

  onDragLeave(ev: any) {
    ev.target.classList.remove('gl-cell-hover');
  }

  onDrop(ev: any, cellIndex: any) {
    ev.stopPropagation();
    const widgetData = JSON.parse(ev.dataTransfer.getData('text/plain'));

    if (ev.target.classList.contains('gl-cell-hover')) {
      ev.target.classList.remove('gl-cell-hover');
    }

    this.cells = (this.cells as any[]).map((cell, index) => {
      if (index === cellIndex) {
        return {
          ...cell,
          widget: widgetData
        }
      }

      return cell;
    });

    this.store();
  }
}
