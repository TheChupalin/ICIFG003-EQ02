import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaStore } from '../services/persona.store';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';
import { FamiliaStore } from '../../familias/store/familia.store';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './persona-list.component.html'
})
export class PersonaListComponent {
  store = inject(PersonaStore);
  familiaStore = inject(FamiliaStore);
  mostrarConfirm = false;
  idAEliminar: number | null = null;

  get _store() {
    return this.store;
  }

  obtenerNombrePersona(id: number | null | undefined) {
    if (!id) return '-';
    const persona = this._store.personas().find(p => p.id === id);
    return persona ? `${persona.nombres} ${persona.apellidopa} ${persona.apellidoma}` : '-';
  }

  obtenerNombreFamilia(id: number | null | undefined) {
    if (!id) return '-';
    const familia = this.familiaStore.familias$().find(f => f.id === id);
    return familia ? familia.nombref : '-';
  }
  
  ngOnInit() {
    this.store.load();
    this.familiaStore.load();
  }

  editar(persona: any) {
    this.store.select(persona);
  }

  abrirConfirm(id: number) {
    this.idAEliminar = id;
    this.mostrarConfirm = true;
  }

  confirmarEliminacion() {
    if (this.idAEliminar !== null) {
      this.store.delete(this.idAEliminar);
    }
    this.cerrarConfirm();
  }

  cerrarConfirm() {
    this.mostrarConfirm = false;
    this.idAEliminar = null;
  }
}
