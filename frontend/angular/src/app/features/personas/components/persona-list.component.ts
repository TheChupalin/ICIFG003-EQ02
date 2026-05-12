import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaStore } from '../services/persona.store';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog.component';

@Component({
  selector: 'app-persona-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './persona-list.component.html'
})
export class PersonaListComponent {
  store = inject(PersonaStore);
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
  
  ngOnInit() {
    this.store.load();
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
