import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { forkJoin, of, Subscription, switchMap } from 'rxjs';
import { GridService } from '../services/grid/grid.service';
import { CellService } from '../services/cell/cell.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlHeaderComponent } from '../gl-core/gl-header/gl-header.component';

@Component({
  selector: 'app-gl-grids',
  standalone: true,
  imports: [
    GlMenuComponent,
    GlHeaderComponent,
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

  private _snackBar = inject(MatSnackBar);

  sub = new Subscription();
  isGridListLoading = false;
  currentGridId: any = null;
  grids: any[] = [];

  form = this.fb.group({
    name: [null, Validators.required],
    cells: this.fb.array([
      this.fb.group({
        row_start: [null, Validators.required],
        column_start: [null, Validators.required],
        row_end: [null, Validators.required],
        column_end: [null, Validators.required]
      })
    ])
  });

  get cells(): FormArray {
    return this.form.get('cells') as FormArray;
  }

  constructor(
    private gridService: GridService,
    private cellService: CellService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('storedCells');
    this.getGrids();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getGrids() {
    this.isGridListLoading = true;
    const getSub = this.gridService.getGrids().subscribe((data) => {
      this.grids = data;
      this.isGridListLoading = false;
    });

    this.sub.add(getSub);
  }

  createCellGroup(): FormGroup {
    return this.fb.group({
      row_start: [null, Validators.required],
      column_start: [null, Validators.required],
      row_end: [null, Validators.required],
      column_end: [null, Validators.required]
    });
  }

  addCellGroup(cellGroup: any = null) {
    if (cellGroup) {
      this.cells.push(cellGroup);  
    } else {
      this.cells.push(this.createCellGroup());
    }
  }

  removeCellGroup(index: number) {
    this.cells.removeAt(index);
  }

  setCurrentGrid(grid: any = null) {
    if (!grid) {
      this.currentGridId = null;
      this.form.reset();
      return;
    }
    
    const {id, name, cells} = grid;

    const cells$ = cells.map((c: any) => {
      return this.cellService.getCellById(c).pipe(
        switchMap((c) => {
          return of({...c})
        })
      );
    });

    const curSub = forkJoin(...cells$).subscribe({
      next: (cellObjs) => {
        this.currentGridId = id;

        this.form.get('name')?.setValue(name);
        this.cells.clear();

        cellObjs.forEach((cell: any) => {
          const {row_start, column_start, row_end, column_end} = cell;
        
          const cellGroup = this.createCellGroup();
          cellGroup.get('row_start')?.setValue(row_start);
          cellGroup.get('column_start')?.setValue(column_start);
          cellGroup.get('row_end')?.setValue(row_end);
          cellGroup.get('column_end')?.setValue(column_end);
          this.addCellGroup(cellGroup);
        });
      }
    });

    this.sub.add(curSub);
  }

  createGrid() {
    const {name, cells} = this.form.value;

    const createSub = this.gridService.createGrid(name, cells).subscribe(() => {
      this.getGrids();
      this.form.reset();
      
      this._snackBar.open('Grid created successfully!', 'OK');
    });

    this.sub.add(createSub);
  }

  deleteGrid() {
    const createSub = this.gridService.deleteGrid(this.currentGridId).subscribe((data) => {
      this.setCurrentGrid();
      this.getGrids();
    });
    this.sub.add(createSub);
  }
}
