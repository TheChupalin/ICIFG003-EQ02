import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Familia } from '../models/familia.model'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  // Ajusta esta URL a la ruta de Personas en tu Spring Boot
  private apiUrl = 'http://localhost:8882/api/v1/entities/personas'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Familia[]> {
    return this.http.get<Familia[]>(this.apiUrl);
  }

  create(familia: Familia): Observable<Familia> {
    return this.http.post<Familia>(this.apiUrl, familia);
  }

  update(familia: Familia): Observable<Familia> {
    // Normalmente en Spring Boot se manda el ID en la URL para actualizar
    return this.http.put<Familia>(`${this.apiUrl}/${familia.id}`, familia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}