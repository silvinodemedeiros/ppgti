import { Component } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gl',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatIconModule
  ],
  exportAs: 'GlComponent',
  templateUrl: './gl.component.html',
  styleUrl: './gl.component.less'
})
export class GlComponent {

  widgets = [
    {
      id: 1,
      type: 'Wind',
      description: 'The wind dances through the world, unseen yet felt, carrying whispers of distant lands. It stirs leaves, powers sails, and shapes landscapes. A force of nature, gentle or fierce, it connects humanity to the ever-changing rhythm of Earth.'
    },
    {
      id: 2,
      type: 'Rain',
      description: 'Rain is nature\'s symphony, a gentle cascade of life-giving water. It nourishes the earth, fills rivers, and rejuvenates spirits. Each droplet tells a story, weaving tranquility and renewal into the world, a timeless gift from the heavens.'
    },
    {
      id: 3,
      type: 'Clouds',
      description: 'Clouds, nature\'s ethereal artists, paint the sky with shifting forms and hues. They bring life-sustaining rain, shade from the sun, and mesmerizing sunsets. Ever-changing, clouds inspire wonder, connect us to nature, and evoke endless imagination.'
    },
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
