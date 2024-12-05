import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GlMenuComponent } from '../gl-menu/gl-menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { WidgetService } from '../services/widget/widget.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gl-widgets',
  standalone: true,
  imports: [
    GlMenuComponent,
    RouterModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './gl-widgets.component.html',
  styleUrl: './gl-widgets.component.less'
})
export class GlWidgetsComponent implements OnInit, OnDestroy {

  widgets: any = [];
  sub = new Subscription();
  isWidgetListLoading = false;
  currentWidget: any = null;

  form: FormGroup;

  constructor(
    private widgetService: WidgetService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      type: [null],
      value: [null]
    });
  }

  ngOnInit(): void {
    this.getWidgets();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getWidgets() {
    this.isWidgetListLoading = true;
    const getSub = this.widgetService.getWidgets().subscribe(({data}) => {
      this.widgets = data;
      this.isWidgetListLoading = false;
    });

    this.sub.add(getSub);
  }

  setCurrentWidget(widget: any) {
    if (!widget) {
      this.currentWidget = null;
      this.form.get('type')?.setValue(null);
      this.form.get('value')?.setValue(null);

      return;
    }

    this.currentWidget = widget;
    this.form.get('type')?.setValue(this.currentWidget.type);
    this.form.get('value')?.setValue(this.currentWidget.value);
  }

  createWidget() {
    const type = this.form.get('type')?.value;
    const value = this.form.get('value')?.value;

    const createSub = this.widgetService.createWidget({
      data: {
        type: type,
        value: value
      }
    }).subscribe(({data}: any) => {
      console.log(data);
      this.widgets = [...this.widgets, data];
    });
    this.sub.add(createSub);
  }

  deleteWidget() {
    const createSub = this.widgetService.deleteWidget(this.currentWidget.id).subscribe((data) => {
      this.setCurrentWidget(null);
      this.getWidgets();
    });
    this.sub.add(createSub);
  }
}