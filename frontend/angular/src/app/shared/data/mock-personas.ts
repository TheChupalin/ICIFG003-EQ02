import { Persona } from '../../features/personas/models/persona.model';

export const MOCK_PERSONAS: Persona[] = [
  {
    id: 1,
    nombres: 'Juan',
    apellidopa: 'García',
    apellidoma: 'López',
    tipo: 'Padre o alumno',
    padre: 0,
    madre: 0,
    direccionPrincipal: 'Calle Principal 123',
    comunaRegion: 'Santiago, Región Metropolitana',
    telefonoMovil: '912345678',
    fechaRegistro: '2024-01-15'
  },
  {
    id: 2,
    nombres: 'María',
    apellidopa: 'Rodríguez',
    apellidoma: 'Martínez',
    tipo: 'Padre o alumno',
    padre: 0,
    madre: 0,
    direccionPrincipal: 'Avenida Central 456',
    comunaRegion: 'Puente Alto, Región Metropolitana',
    telefonoMovil: '987654321',
    fechaRegistro: '2024-02-20'
  },
  {
    id: 3,
    nombres: 'Carlos',
    apellidopa: 'Fernández',
    apellidoma: 'García',
    tipo: 'Padre o alumno',
    padre: 1,
    madre: 2,
    direccionPrincipal: 'Calle Secundaria 789',
    comunaRegion: 'La Florida, Región Metropolitana',
    telefonoMovil: '934567890',
    fechaRegistro: '2024-03-10'
  }
];
