import { Routes } from '@angular/router';
import { PersonaPageComponent } from './pages/persona-page.component';
import { authGuard } from '../../core/guards/auth.guard';

export const PERSONA_ROUTES: Routes = [
  {
    path: '',
    component: PersonaPageComponent,
    canActivate: [authGuard]
  }
];
