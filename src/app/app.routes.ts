import { Routes } from '@angular/router';
import { GlComponent } from './gl/gl.component';
import { GlGridsComponent } from './gl-grids/gl-grids.component';
import { GlWidgetsComponent } from './gl-widgets/gl-widgets.component';
import { GlTemplatesComponent } from './gl-templates/gl-templates.component';
import { LoginComponent } from './gl-core/login/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'editor/widgets', component: GlComponent },
  { path: 'editor/grids', component: GlComponent },
  { path: 'editor/templates', component: GlComponent },
  { path: 'grids', component: GlGridsComponent },
  { path: 'widgets', component: GlWidgetsComponent },
  { path: 'templates', component: GlTemplatesComponent },
  { path: 'grids/{id}', component: GlGridsComponent },
  { path: 'widgets/{id}', component: GlWidgetsComponent },
  { path: 'templates/{id}', component: GlTemplatesComponent },
  { path: '**', redirectTo: '/login' }
]