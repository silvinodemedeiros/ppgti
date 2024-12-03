import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';

@Component({
  selector: 'app-gl-grids',
  standalone: true,
  imports: [
    GlMenuComponent,
    RouterModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './gl-grids.component.html',
  styleUrl: './gl-grids.component.less'
})
export class GlGridsComponent {

  widgets = [
    {
      id: 0,
      type: 'No Grids'
    }
  ];

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
    
  ) {}

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
