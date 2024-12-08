import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { forkJoin, of, Subscription, switchMap } from 'rxjs';
import { GridService } from '../services/grid/grid.service';
import { CellService } from '../services/cell/cell.service';
import { TemplateService } from '../services/template/template.service';

@Component({
  selector: 'app-gl-templates',
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
  templateUrl: './gl-templates.component.html',
  styleUrl: './gl-templates.component.less'
})
export class GlTemplatesComponent {

  sub = new Subscription();
  isTemplateListLoading = false;
  currentTemplateId: any = null;
  templates: any[] = [];

  form = this.fb.group({
    name: [null],
    grids: [null]
  });

  constructor(
    private gridService: GridService,
    private templateService: TemplateService,
    private cellService: CellService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('storedCells');
    this.templateService.getTemplates().subscribe((response) => {
      this.templates = response;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getTemplates() {
  }

  setCurrentTemplate(template: any = null) {
    this.currentTemplateId = template.id;
    this.form.get('name')?.setValue(template.name);
  }

  deleteTemplate() {
    const createSub = this.templateService.deleteTemplate(this.currentTemplateId).subscribe((data) => {
      this.setCurrentTemplate();
      this.getTemplates();
    });
    this.sub.add(createSub);
  }
}
