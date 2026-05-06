import { Routes } from '@angular/router';
import { FamiliaPageComponent } from './pages/familia-page.component';
import { authGuard } from '../../core/guards/auth.guard';

export const FAMILIA_ROUTES: Routes = [
  {
    path: '',
    component: FamiliaPageComponent,
    canActivate: [authGuard]
  }
];
