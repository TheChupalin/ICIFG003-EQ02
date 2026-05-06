import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Familia } from '../models/familia.model';
import { MOCK_FAMILIAS } from '../../../shared/data/mock-familias';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  private familias = [...MOCK_FAMILIAS];
  private nextId = Math.max(...this.familias.map(f => f.id)) + 1;

  getAll(): Observable<Familia[]> {
    // Simula delay de red de 300ms
    return of([...this.familias]).pipe(delay(300));
  }

  create(familia: Familia): Observable<Familia> {
    familia.id = this.nextId++;
    this.familias.push(familia);
    return of(familia).pipe(delay(300));
  }

  update(id: number, familia: Familia): Observable<Familia> {
    const index = this.familias.findIndex(f => f.id === id);
    if (index !== -1) {
      this.familias[index] = familia;
    }
    return of(familia).pipe(delay(300));
  }

  delete(id: number): Observable<void> {
    this.familias = this.familias.filter(f => f.id !== id);
    return of(void 0).pipe(delay(300));
  }
}
