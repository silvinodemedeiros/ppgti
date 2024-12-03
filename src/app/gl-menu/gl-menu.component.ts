import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gl-menu',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule
  ],
  templateUrl: './gl-menu.component.html',
  styleUrl: './gl-menu.component.less'
})
export class GlMenuComponent {

}
