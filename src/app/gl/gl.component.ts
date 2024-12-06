import { Component, OnDestroy, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, ResolveEnd, ResolveStart, Router, RouterModule, RoutesRecognized } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { WidgetService } from '../services/widget/widget.service';
import { filter, Observable, of, Subscription } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';
import { GridService } from '../services/grid/grid.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TemplateService } from '../services/template/template.service';

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
  
  itemList = [];
  currentWeather: any;

  isListLoading = false;

  cells: any[] = [
    {
      id: 1,
      area: '1 / 1 / 2 / 2',
      widget: null
    },
    {
      id: 2,
      area: '1 / 2 / 3 / 2',
      widget: null
    },
    {
      id: 3,
      area: '2 / 1 / 2 / 1',
      widget: null
    }
  ];

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

  itemList$: Observable<any[]> = of([]);
  currentRoute: any;

  constructor(
    private widgetService: WidgetService,
    private gridService: GridService,
    private templateService: TemplateService,
    private weatherService: WeatherService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.activatedRoute.url.subscribe((urlSegments) => {

      this.currentRoute = urlSegments.map((segment) => segment.path).join('/');

      if (this.currentRoute.includes('widgets')) {
        this.itemList$ = this.widgets$;
      } else if (this.currentRoute.includes('grids')) {
        this.itemList$ = this.grids$;
      } else if (this.currentRoute.includes('templates')) {
        this.itemList$ = this.templates$;
      }
    });

    const sub = this.weatherService.getWeather().subscribe(
      (response) => {
        this.currentWeather = response;
      }
    );

    this.subscription.add(sub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeWidget(cellIndex: any): void {
    this.cells = this.cells.map((cell, index) => {
      if (index === cellIndex) {
        return {
          ...cell,
          widget: null
        };
      }

      return cell;
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

    this.cells = this.cells.map((cell, index) => {
      if (index === cellIndex) {
        return {
          ...cell,
          widget: widgetData
        }
      }

      return cell;
    });
  }
}
