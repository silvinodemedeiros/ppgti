import { Component, OnDestroy, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, ResolveEnd, ResolveStart, Router, RouterModule, RoutesRecognized } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { WidgetService } from '../services/widget/widget.service';
import { filter, forkJoin, Observable, of, Subscription } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';
import { GridService } from '../services/grid/grid.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TemplateService } from '../services/template/template.service';
import { AsyncLoadingPipe } from '../pipes/async-loading.pipe';
import { CellService } from '../services/cell/cell.service';

@Component({
  selector: 'app-gl',
  standalone: true,
  imports: [
    GlMenuComponent,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exportAs: 'GlComponent',
  templateUrl: './gl.component.html',
  styleUrl: './gl.component.less'
})
export class GlComponent implements OnInit, OnDestroy {

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

  assignGrid(grid: any) {
    const cellRequests = grid.cells.map((cellId: any) => {
      return this.cellService.getCellById(cellId);
    });

    forkJoin(cellRequests).subscribe((cellList: any) => {
      this.cells = [...cellList];
      this.store();
    })
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
