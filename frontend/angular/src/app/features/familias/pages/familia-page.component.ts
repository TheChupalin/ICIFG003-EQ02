import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliaFormComponent } from '../components/familia-form/familia-form.component';
import { FamiliaListComponent } from '../components/familia-list/familia-list.component';
import { inject } from '@angular/core';
import { FamiliaStore } from '../store/familia.store';

@Component({
  selector: 'app-familia-page',
  standalone: true,
  imports: [CommonModule, FamiliaFormComponent, FamiliaListComponent],
  template: `
    <div class="container-fluid mt-4">
      <div class="row">
        <div class="col-md-5">
          <app-familia-form></app-familia-form>
        </div>
        <div class="col-md-7">
          <div *ngIf="store.success$()" class="alert alert-success alert-dismissible fade show">
            {{ store.success$() }}
            <button type="button" class="btn-close" (click)="clearSuccess()" aria-label="Close"></button>
          </div>
          <div *ngIf="store.error$()" class="alert alert-danger alert-dismissible fade show">
            {{ store.error$() }}
            <button type="button" class="btn-close" (click)="clearError()" aria-label="Close"></button>
          </div>
          <app-familia-list></app-familia-list>
        </div>
      </div>
    </div>
  `
})
export class FamiliaPageComponent {
  store = inject(FamiliaStore);

  clearSuccess(): void {
    // La lógica de auto-clear ya está en el store con effect()
    // Este método solo es para permitir cerrar manualmente
  }

  clearError(): void {
    // La lógica de auto-clear ya está en el store con effect()
    // Este método solo es para permitir cerrar manualmente
  }
}
