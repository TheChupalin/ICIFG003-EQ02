import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { effect } from '@angular/core';
import { FamiliaStore } from '../../store/familia.store';

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
            <input type="text" class="form-control" id="representante" formControlName="representante" required>
            <small class="text-danger" *ngIf="form.get('representante')?.invalid && form.get('representante')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="estadocivilpadres" class="form-label">Estado Civil Padres</label>
            <input type="text" class="form-control" id="estadocivilpadres" formControlName="estadocivilpadres" required>
            <small class="text-danger" *ngIf="form.get('estadocivilpadres')?.invalid && form.get('estadocivilpadres')?.touched">
              Campo requerido
            </small>
          </div>

          <div class="form-group mb-3">
            <label for="situacionvivienda" class="form-label">Situación Vivienda</label>
            <input type="text" class="form-control" id="situacionvivienda" formControlName="situacionvivienda" required>
            <small class="text-danger" *ngIf="form.get('situacionvivienda')?.invalid && form.get('situacionvivienda')?.touched">
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
  private fb = inject(FormBuilder);

  form: FormGroup = this.fb.group({
    id: [0],
    nombref: ['', Validators.required],
    representante: ['', Validators.required],
    estadocivilpadres: ['', Validators.required],
    situacionvivienda: ['', Validators.required],
    telefono_fijo: [0, Validators.required],
    contacto_emergencia: [0, Validators.required]
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
    this.form.reset({ id: 0 });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const familia = this.form.value;
    if (familia.id === 0) {
      this.store.add(familia);
    } else {
      this.store.update(familia);
    }
  }

  onClear(): void {
    this.store.clearSelected();
    this.form.reset({ id: 0 });
  }
}
