import { Routes } from '@angular/router';
import { GlComponent } from './gl/gl.component';
import { GlGridsComponent } from './gl-grids/gl-grids.component';
import { GlWidgetsComponent } from './gl-widgets/gl-widgets.component';

export const routes: Routes = [
    { path: '', redirectTo: '/editor', pathMatch: 'full' },
    { path: 'editor', component: GlComponent },
    { path: 'grids', component: GlGridsComponent },
    { path: 'widgets', component: GlWidgetsComponent },
    { path: '**', redirectTo: '/editor' }, // Fallback route for invalid URLs
  ]