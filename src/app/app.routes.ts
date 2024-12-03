import { Routes } from '@angular/router';
import { GlComponent } from './gl/gl.component';
import { GlGridsComponent } from './gl-grids/gl-grids.component';

export const routes: Routes = [
    { path: '', redirectTo: '/editor', pathMatch: 'full' },
    { path: 'editor', component: GlComponent },
    { path: 'editor/grids', component: GlGridsComponent },
    { path: '**', redirectTo: '/editor' }, // Fallback route for invalid URLs
  ]