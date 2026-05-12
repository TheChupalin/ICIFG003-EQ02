import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamiliaStore } from '../../store/familia.store';
import { signal } from '@angular/core';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog.component';
import { PersonaStore } from '../../../personas/services/persona.store';

@Component({
  selector: 'app-familia-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  template: `
    <div class="card mt-3">
      <div class="card-header">
        <h5>Lista de Familias</h5>
      </div>
      <div class="card-body">
        <div *ngIf="store.loading$()" class="spinner-border" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>

        <table class="table table-hover" *ngIf="!store.loading$() && store.familias$().length > 0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Familia</th>
              <th>Representante</th>
              <th>Estado Civil</th>
              <th>Situación Vivienda</th>
              <th>Teléfono</th>
              <th>Emergencia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let familia of store.familias$()">
              <td>{{ familia.id }}</td>
              <td>{{ familia.nombref }}</td>
              <td>{{ obtenerNombreRepresentante(familia.representante) }}</td>
              <td>{{ familia.estadoCivilPadres }}</td>
              <td>{{ familia.situacionVivienda }}</td>
              <td>{{ familia.telefono_fijo }}</td>
              <td>{{ familia.contacto_emergencia }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" (click)="onEdit(familia)">Editar</button>
                <button class="btn btn-sm btn-danger" (click)="onDeleteClick(familia.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div *ngIf="!store.loading$() && store.familias$().length === 0" class="alert alert-info">
          No hay familias registradas
        </div>
      </div>
    </div>

    <app-confirm-dialog
      *ngIf="mostrarConfirm()"
      [titulo]="'Eliminar Familia'"
      [mensaje]="'¿Está seguro que desea eliminar esta familia?'"
      (onConfirm)="onConfirmDelete()"
      (onCancel)="mostrarConfirm.set(false)">
    </app-confirm-dialog>
  `
})
export class FamiliaListComponent implements OnInit {
  store = inject(FamiliaStore);
  personaStore = inject(PersonaStore);
  mostrarConfirm = signal(false);
  familiaIdToDelete: number = 0;

  obtenerNombreRepresentante(id: number | string | null | undefined) {
    if (id == null || id === '') return '-';
    const personaId = Number(id);
    const persona = this.personaStore.personas().find(p => p.id === personaId);
    return persona ? `${persona.nombres} ${persona.apellidopa} ${persona.apellidoma}` : String(id);
  }

  ngOnInit(): void {
    this.store.load();
    this.personaStore.load();
  }

  onEdit(familia: any): void {
    this.store.select(familia);
  }

  onDeleteClick(id: number): void {
    this.familiaIdToDelete = id;
    this.mostrarConfirm.set(true);
  }

  onConfirmDelete(): void {
    this.store.delete(this.familiaIdToDelete);
    this.mostrarConfirm.set(false);
  }
}
