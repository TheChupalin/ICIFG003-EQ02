import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { effect } from '@angular/core';
import { FamiliaStore } from '../../store/familia.store';
import { PersonaStore } from '../../../personas/services/persona.store';

@Component({
  selector: 'app-familia-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card mt-3">
      <div class="card-header">
        <h5>{{ form.get('id')?.value === 0 ? 'Nueva Familia' : 'Editar Familia' }}</h5>
      </div>
      <div class="card-body">
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group mb-3">
            <label for="nombref" class="form-label">Nombre Familia</label>
            <input type="text" class="form-control" id="nombref" formControlName="nombref" required>
            <small class="text-danger" *ngIf="form.get('nombref')?.invalid && form.get('nombref')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="representante" class="form-label">Representante</label>
            <select class="form-control" id="representante" formControlName="representante">
              <option [ngValue]="null">-- Seleccione representante --</option>
              <option *ngFor="let adulto of adultos" [ngValue]="adulto.id">
                {{ adulto.nombres }} {{ adulto.apellidopa }} {{ adulto.apellidoma }}
              </option>
            </select>
            <small class="text-danger" *ngIf="form.get('representante')?.invalid && form.get('representante')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="estadoCivilPadres" class="form-label">Estado Civil Padres</label>
            <input type="text" class="form-control" id="estadoCivilPadres" formControlName="estadoCivilPadres" required>
            <small class="text-danger" *ngIf="form.get('estadoCivilPadres')?.invalid && form.get('estadoCivilPadres')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="situacionVivienda" class="form-label">Situación Vivienda</label>
            <input type="text" class="form-control" id="situacionVivienda" formControlName="situacionVivienda" required>
            <small class="text-danger" *ngIf="form.get('situacionVivienda')?.invalid && form.get('situacionVivienda')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="telefono_fijo" class="form-label">Teléfono Fijo</label>
            <input type="number" class="form-control" id="telefono_fijo" formControlName="telefono_fijo" required>
            <small class="text-danger" *ngIf="form.get('telefono_fijo')?.invalid && form.get('telefono_fijo')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="contacto_emergencia" class="form-label">Contacto Emergencia</label>
            <input type="number" class="form-control" id="contacto_emergencia" formControlName="contacto_emergencia" required>
            <small class="text-danger" *ngIf="form.get('contacto_emergencia')?.invalid && form.get('contacto_emergencia')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid || store.loading$()">
              {{ form.get('id')?.value === 0 ? 'Guardar' : 'Actualizar' }}
            </button>
            <button type="button" class="btn btn-secondary" (click)="onClear()" [disabled]="form.get('id')?.value === 0">
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class FamiliaFormComponent implements OnInit {
  store = inject(FamiliaStore);
  personaStore = inject(PersonaStore);
  private fb = inject(FormBuilder);

  get adultos() {
    return this.personaStore.personas().filter(p => p.tipo === 'Padre/Madre');
  }

  form: FormGroup = this.fb.group({
    id: [0],
    nombref: ['', Validators.required],
    representante: [null, Validators.required],
    estadoCivilPadres: ['', Validators.required],
    situacionVivienda: ['', Validators.required],
    telefono_fijo: [null, Validators.required],
    contacto_emergencia: [null, Validators.required]
  });

  constructor() {
    // Sync selected familia to form
    effect(() => {
      const selected = this.store.selected$();
      if (selected) {
        this.form.patchValue(selected);
      } else {
        this.form.reset({ id: 0 });
      }
    });
  }

  ngOnInit(): void {
    this.store.load();
    this.personaStore.load();
    this.form.reset({ id: 0, representante: null, telefono_fijo: null, contacto_emergencia: null });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const payload = {
      nombref: this.form.value.nombref?.trim() ?? '',
      representante: Number(this.form.value.representante),
      estadoCivilPadres: this.form.value.estadoCivilPadres?.trim() ?? '',
      situacionVivienda: this.form.value.situacionVivienda?.trim() ?? '',
      telefono_fijo: Number(this.form.value.telefono_fijo),
      contacto_emergencia: Number(this.form.value.contacto_emergencia)
    };

    if (this.form.value.id && this.form.value.id > 0) {
      this.store.update({ ...payload, id: this.form.value.id } as any);
    } else {
      this.store.add(payload as any);
    }
  }

  onClear(): void {
    this.store.clearSelected();
    this.form.reset({
      id: 0,
      representante: null,
      telefono_fijo: null,
      contacto_emergencia: null
    });
  }
}
