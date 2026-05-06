import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Familia } from '../models/familia';

@Injectable({
  providedIn: 'root',
})
export class FamiliaService {
  private apiUrl = 'http://localhost:8882/api/v1/entities/familias';

  constructor(private http: HttpClient) {}

  getFamiliasHttp(): Observable<Familia[]> {
    return this.http.get<Familia[]>(this.apiUrl);
    error: (err: any) => console.error(err)
  }

  crearFamilia(familia: Familia): Observable<Familia[]> {
    return this.http.post<Familia[]>(this.apiUrl, familia);
    error: (err: any) => console.error(err)
  }

  actualizarFamilia(id: number, familia: Familia): Observable<Familia[]> {
    return this.http.put<Familia[]>(`${this.apiUrl}/${id}`, familia);
    error: (err: any) => console.error(err)
  }

  eliminarFamilia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
    error: (err: any) => console.error(err)
  }
}
