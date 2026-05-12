import { Component, inject, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PersonaStore } from '../services/persona.store';
import { FamiliaStore } from '../../familias/store/familia.store';

@Component({
  selector: 'app-persona-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './persona-form.component.html'
})
export class PersonaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _store = inject(PersonaStore);
  private familiaStore = inject(FamiliaStore);

  get store() {
    return this._store;
  }

  get familias() {
    return this.familiaStore.familias$();
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
    familia: [0, Validators.required],
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

  ngOnInit(): void {
    this.familiaStore.load();
  }

  guardar() {
    if (this.form.invalid) return;

    const persona = {
      ...this.form.value,
      familia: Number(this.form.value.familia ?? 0)
    };

    if (persona.id) {
      this.store.update(persona as any);
    } else {
      this.store.add(persona as any);
    }

    this.form.reset({ familia: 0 });
  }

  cancelar() {
    this.store.clearSelection();
    this.form.reset({ familia: 0 });
  }
}
