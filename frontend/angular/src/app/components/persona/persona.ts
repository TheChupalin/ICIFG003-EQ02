import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../services/persona';
import { Persona } from '../../models/persona';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: '<router-outlet></router-outlet>',
  templateUrl: './persona.html',
})
export class PersonaComponent implements OnInit {
  personas: Persona[] = [];

  persona: Persona = {
    id: 0,
    nombres: '',
    apellidopa: '',
    apellidoma: '',
    tipo: '',
    padre: 0,
    madre: 0,
    direccionPrincipal: '',
    comunaRegion: '',
    telefonoMovil: '',
    fechaRegistro: ''
  };

  constructor(private personaService: PersonaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('componente.persona.ngOnInit');
    this.cargarPersonasComponent();
  }

  cargarPersonasComponent() {
    this.personaService.getPersonasHttp().subscribe(data => {
      this.personas = data;
      this.cdr.detectChanges();
    });
    error: (err: any) => console.error(err)
  }

  guardar() {
    if (this.persona.id === 0) {
      this.personaService.crearPersona(this.persona).subscribe(() => {
        this.cargarPersonasComponent();
        this.limpiar();
      });
    } else {
      this.personaService.actualizarPersona(this.persona.id, this.persona).subscribe(() => {
        this.cargarPersonasComponent();
        this.limpiar();
      });
    }
  }

  eliminar(id: number) {
    this.personaService.eliminarPersona(id).subscribe(() => {
        this.cargarPersonasComponent();
      });
  }

  editar(p: Persona) {
    this.persona = { ...p };
  }

  limpiar() {
    this.persona = {
      id: 0,
      nombres: '',
      apellidopa: '',
      apellidoma: '',
      tipo: '',
      padre: 0,
      madre: 0,
      direccionPrincipal: '',
      comunaRegion: '',
      telefonoMovil: '',
      fechaRegistro: ''
    };
  }
}
