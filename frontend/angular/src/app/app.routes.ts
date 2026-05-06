import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'personas',
        loadChildren: () =>
            import('./features/personas/persona.routes')
                .then(m => m.PERSONA_ROUTES)
    },
    {
        path: 'familias',
        loadChildren: () =>
            import('./features/familias/familia.routes')
                .then(m => m.FAMILIA_ROUTES)
    },
    {
        path: '',
        loadChildren: () =>
            import('./features/landing/landing.routes')
                .then(m => m.LANDING_ROUTES)
    }
];
