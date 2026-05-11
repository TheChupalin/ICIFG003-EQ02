import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  // Ajusta esta URL a la ruta de Personas en tu Spring Boot
  private apiUrl = 'http://localhost:8882/api/v1/entities/personas'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.apiUrl);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.apiUrl, persona);
  }

  update(persona: Persona): Observable<Persona> {
    // Normalmente en Spring Boot se manda el ID en la URL para actualizar
    return this.http.put<Persona>(`${this.apiUrl}/${persona.id}`, persona);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}