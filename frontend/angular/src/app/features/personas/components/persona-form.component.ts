import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PersonaStore } from '../services/persona.store';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html'
})
export class PersonaFormComponent {
  private fb = inject(FormBuilder);
  private _store = inject(PersonaStore);

  get store() {
    return this._store;
  }

  private obtenerFechaActual() {
    return new Date().toISOString().slice(0, 10);
  }

  form = this.fb.group({
    id: [0],
    nombres: ['', Validators.required],
    apellidopa: ['', Validators.required],
    apellidoma: ['', Validators.required],
    tipo: ['', Validators.required],
    padre: [0, Validators.required],
    madre: [0, Validators.required],
    direccionPrincipal: ['', Validators.required],
    comunaRegion: ['', Validators.required],
    telefonoMovil: ['', Validators.required],
    fechaRegistro: [this.obtenerFechaActual(), Validators.required]
  });

  get padres() {
    return this.store.personas().filter(p => p.tipo === 'Padre/Madre');
  }

  constructor() {
    effect(() => {
      const persona = this.store.selected();
      if (persona) {
        this.form.patchValue(persona);
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const persona = this.form.value;

    if (persona.id) {
      this.store.update(persona as any);
    } else {
      this.store.add(persona as any);
    }

    this.form.reset();
  }

  cancelar() {
    this.store.clearSelection();
    this.form.reset();
  }
}
