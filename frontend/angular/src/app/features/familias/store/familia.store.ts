import { Injectable } from '@angular/core';
import { signal, computed, effect } from '@angular/core';
import { Familia } from '../models/familia.model';
import { FamiliaService } from '../services/familia.service';

@Injectable({
  providedIn: 'root'
})
export class FamiliaStore {
  // Signals
  private familias = signal<Familia[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);
  private selected = signal<Familia | null>(null);
  private success = signal<string | null>(null);

  // Public computed
  familias$ = computed(() => this.familias());
  loading$ = computed(() => this.loading());
  error$ = computed(() => this.error());
  selected$ = computed(() => this.selected());
  success$ = computed(() => this.success());

  constructor(private familiaService: FamiliaService) {
    // Auto-clear success message after 3 seconds
    effect(() => {
      const msg = this.success();
      if (msg) {
        setTimeout(() => this.success.set(null), 3000);
      }
    });

    // Auto-clear error message after 5 seconds
    effect(() => {
      const err = this.error();
      if (err) {
        setTimeout(() => this.error.set(null), 5000);
      }
    });
  }

  // Load all familias
  load(): void {
    this.loading.set(true);
    this.error.set(null);
    this.familiaService.getAll().subscribe({
      next: (data) => {
        this.familias.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading familias:', err);
        this.error.set('Error al cargar familias');
        this.loading.set(false);
      }
    });
  }

  // Select a familia
  select(familia: Familia): void {
    this.selected.set(JSON.parse(JSON.stringify(familia)));
  }

  // Clear selection
  clearSelected(): void {
    this.selected.set(null);
  }

  // Add new familia
  add(familia: Familia): void {
    this.loading.set(true);
    this.error.set(null);
    this.familiaService.create(familia).subscribe({
      next: () => {
        this.success.set('Familia creada exitosamente');
        this.load();
        this.clearSelected();
      },
      error: (err) => {
        console.error('Error creating familia:', err);
        this.error.set('Error al crear familia');
        this.loading.set(false);
      }
    });
  }

  // Update existing familia
  update(familia: Familia): void {
    if (!familia.id) return;
    this.loading.set(true);
    this.error.set(null);
    this.familiaService.update(familia).subscribe({
      next: () => {
        this.success.set('Familia actualizada exitosamente');
        this.load();
        this.clearSelected();
      },
      error: (err) => {
        console.error('Error updating familia:', err);
        this.error.set('Error al actualizar familia');
        this.loading.set(false);
      }
    });
  }

  // Delete familia
  delete(id: number): void {
    this.loading.set(true);
    this.error.set(null);
    this.familiaService.delete(id).subscribe({
      next: () => {
        this.success.set('Familia eliminada exitosamente');
        this.load();
      },
      error: (err) => {
        console.error('Error deleting familia:', err);
        this.error.set('Error al eliminar familia');
        this.loading.set(false);
      }
    });
  }
}
