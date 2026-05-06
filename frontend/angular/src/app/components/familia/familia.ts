import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Familia } from '../../models/familia';
import { FamiliaService } from '../../services/familia';

@Component({
  selector: 'app-familia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './familia.html',
  styleUrl: './familia.css'
})
export class FamiliaComponent implements OnInit {
  familias: Familia[] = [];

  familia: Familia = {
    id: 0,
    nombref: '',
    representante: '',
    estadocivilpadres: '',
    situacionvivienda: '',
    telefono_fijo: 0,
    contacto_emergencia: 0
  };

  constructor(private familiaService: FamiliaService) {}

  ngOnInit(): void {
    this.cargarFamilias();
  }

  cargarFamilias() {
    this.familiaService.getFamiliasHttp().subscribe(data => {
      this.familias = data;
    });
    error: (err: any) => console.error(err)
  }

  guardar() {
    if (this.familia.id === 0) {
      this.familiaService.crearFamilia(this.familia).subscribe(() => {
        this.cargarFamilias();
        this.limpiar();
      });
    } else {
      this.familiaService.actualizarFamilia(this.familia.id, this.familia).subscribe(() => {
        this.cargarFamilias();
        this.limpiar();
      });
    }
  }

  eliminar(id: number) {
    this.familiaService.eliminarFamilia(id).subscribe(() => {
      this.cargarFamilias();
    });
  }

  editar(f: Familia) {
    this.familia = { ...f };
  }

  limpiar() {
    this.familia = {
      id: 0,
      nombref: '',
      representante: '',
      estadocivilpadres: '',
      situacionvivienda: '',
      telefono_fijo: 0,
      contacto_emergencia: 0
    };
  }
}
