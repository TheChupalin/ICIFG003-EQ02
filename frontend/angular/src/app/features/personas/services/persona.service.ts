import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Persona } from '../models/persona.model';
import { MOCK_PERSONAS } from '../../../shared/data/mock-personas';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personas = [...MOCK_PERSONAS];
  private nextId = Math.max(...this.personas.map(p => p.id)) + 1;

  getAll(): Observable<Persona[]> {
    // Simula delay de red de 300ms
    return of([...this.personas]).pipe(delay(300));
  }

  create(persona: Persona): Observable<Persona> {
    persona.id = this.nextId++;
    this.personas.push(persona);
    return of(persona).pipe(delay(300));
  }

  update(persona: Persona): Observable<Persona> {
    const index = this.personas.findIndex(p => p.id === persona.id);
    if (index !== -1) {
      this.personas[index] = persona;
    }
    return of(persona).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.personas = this.personas.filter(p => p.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
