import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-gl-header',
  standalone: true,
  imports: [
    MatMenuModule
  ],
  templateUrl: './gl-header.component.html',
  styleUrl: './gl-header.component.less'
})
export class GlHeaderComponent {

}
