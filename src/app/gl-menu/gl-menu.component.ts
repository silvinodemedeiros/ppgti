import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-gl-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './gl-menu.component.html',
  styleUrl: './gl-menu.component.less'
})
export class GlMenuComponent {

}
