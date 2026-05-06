import { Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page.component';
import { LoginPageComponent } from './pages/login-page.component';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];
