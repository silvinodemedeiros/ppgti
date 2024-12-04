import { Component, OnDestroy, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { WidgetService } from '../services/widget/widget.service';
import { Subscription } from 'rxjs';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-gl',
  standalone: true,
  imports: [
    GlMenuComponent,
    CommonModule,
    RouterModule,
    DragDropModule,
    MatIconModule
  ],
  exportAs: 'GlComponent',
  templateUrl: './gl.component.html',
  styleUrl: './gl.component.less'
})
export class GlComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  
  widgets = [];
  currentWeather: any;

  isWidgetListLoading = false;

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

  constructor(
    private widgetService: WidgetService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.isWidgetListLoading = true;
    const s = this.widgetService.getWidgets().subscribe(({data}) => {
      this.widgets = data;
      this.isWidgetListLoading = false;
    });

    const sub = this.weatherService.getWeather().subscribe(
      ({data}) => {
        this.currentWeather = data;
      }
    );

    this.subscription.add(sub);
    this.subscription.add(s);
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
