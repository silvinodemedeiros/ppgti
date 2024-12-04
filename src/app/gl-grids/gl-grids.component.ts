import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { GridService } from '../services/grid/grid.service';

@Component({
  selector: 'app-gl-grids',
  standalone: true,
  imports: [
    GlMenuComponent,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './gl-grids.component.html',
  styleUrl: './gl-grids.component.less'
})
export class GlGridsComponent {

  widgets: any = [];
  sub = new Subscription();
  isGridListLoading = false;
  currentGrid: any = null;
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

  form: FormGroup;

  constructor(
    private gridService: GridService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      rowStart: [null],
      columnStart: [null],
      rowEnd: [null],
      columnEnd: [null]
    });
  }

  ngOnInit(): void {
    this.getGrids();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getGrids() {
    this.isGridListLoading = true;
    const getSub = this.gridService.getGrids().subscribe(({data}) => {
      this.widgets = data;
      this.isGridListLoading = false;
    });

    this.sub.add(getSub);
  }

  setCurrentGrid(widget: any) {
    if (!widget) {
      this.currentGrid = null;
      this.form.get('type')?.setValue(null);
      this.form.get('value')?.setValue(null);

      return;
    }

    this.currentGrid = widget;
    this.form.get('type')?.setValue(this.currentGrid.type);
    this.form.get('value')?.setValue(this.currentGrid.value);
  }

  createGrid() {
    const type = this.form.get('type')?.value;
    const value = this.form.get('value')?.value;

    const createSub = this.gridService.createGrid({
      data: {
        type: type,
        value: value
      }
    }).subscribe(({data}: any) => {
      this.widgets = [...this.widgets, data];
    });
    this.sub.add(createSub);
  }

  deleteGrid() {
    const createSub = this.gridService.deleteGrid(this.currentGrid.id).subscribe((data) => {
      this.setCurrentGrid(null);
      this.getGrids();
    });
    this.sub.add(createSub);
  }
}
