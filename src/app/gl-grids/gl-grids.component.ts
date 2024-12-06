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

  private _snackBar = inject(MatSnackBar);

  sub = new Subscription();
  isGridListLoading = false;
  currentGridId: any = null;
  grids: any[] = [];

  form = this.fb.group({
    name: [null, Validators.required],
    cells: this.fb.array([
      this.fb.group({
        rowStart: [null, Validators.required],
        columnStart: [null, Validators.required],
        rowEnd: [null, Validators.required],
        columnEnd: [null, Validators.required]
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
    this.getGrids();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getGrids() {
    this.isGridListLoading = true;
    const getSub = this.gridService.getGrids().subscribe(({data}) => {
      this.grids = data;
      this.isGridListLoading = false;
    });

    this.sub.add(getSub);
  }

  createCellGroup(): FormGroup {
    return this.fb.group({
      rowStart: [null, Validators.required],
      columnStart: [null, Validators.required],
      rowEnd: [null, Validators.required],
      columnEnd: [null, Validators.required]
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
          return of({...c.data})
        })
      );
    })

    const curSub = forkJoin(...cells$).subscribe({
      next: (cellObjs) => {
        this.currentGridId = id;

        this.form.get('name')?.setValue(name);
        this.cells.clear();

        cellObjs.forEach((cell: any) => {
          const {row_start, column_start, row_end, column_end} = cell;
        
          const cellGroup = this.createCellGroup();
          cellGroup.get('rowStart')?.setValue(row_start);
          cellGroup.get('columnStart')?.setValue(column_start);
          cellGroup.get('rowEnd')?.setValue(row_end);
          cellGroup.get('columnEnd')?.setValue(column_end);
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
