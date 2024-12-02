import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GlComponent } from './gl/gl.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    DragDropModule, GlComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'source';
}
