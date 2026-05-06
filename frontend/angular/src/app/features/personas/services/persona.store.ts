import { Injectable, signal, inject } from '@angular/core';
import { PersonaService } from './persona.service';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaStore {
  private service = inject(PersonaService);

  personas = signal<Persona[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selected = signal<Persona | null>(null);
  success = signal<string | null>(null);

  load() {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: data => {
        this.personas.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error cargando personas');
        this.loading.set(false);
      }
    });
  }

  select(persona: Persona) {
    this.selected.set(persona);
  }

  clearSelection() {
    this.selected.set(null);
  }

  add(persona: Persona) {
    this.service.create(persona).subscribe({
      next: p => this.personas.update(list => [...list, p])
    });
    this.success.set('Persona guardada correctamente');
    setTimeout(() => this.success.set(null), 3000);
  }

  update(persona: Persona) {
    this.service.update(persona).subscribe(updated => {
      this.personas.update(list =>
        list.map(p => p.id === updated.id ? updated : p)
      );
      this.clearSelection();
      this.success.set('Persona guardada correctamente');
      setTimeout(() => this.success.set(null), 3000);
    });
  }

  delete(id: number) {
    this.service.delete(id).subscribe({
      next: () => {
        this.personas.update(list => list.filter(p => p.id !== id));
      }
    });
  }
}
