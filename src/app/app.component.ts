import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GlComponent } from './gl/gl.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, DragDropModule, GlComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'source';
}
