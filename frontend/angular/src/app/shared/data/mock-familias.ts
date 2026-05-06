import { Familia } from '../../features/familias/models/familia.model';

export const MOCK_FAMILIAS: Familia[] = [
  {
    id: 1,
    nombref: 'Familia García López',
    representante: 'Juan García López',
    estadocivilpadres: 'Casados',
    situacionvivienda: 'Casa propia',
    telefono_fijo: 2712345,
    contacto_emergencia: 912345678
  },
  {
    id: 2,
    nombref: 'Familia Rodríguez Martínez',
    representante: 'María Rodríguez Martínez',
    estadocivilpadres: 'Divorciados',
    situacionvivienda: 'Departamento arrendado',
    telefono_fijo: 2787654,
    contacto_emergencia: 987654321
  },
  {
    id: 3,
    nombref: 'Familia Fernández García',
    representante: 'Carlos Fernández García',
    estadocivilpadres: 'Solteros',
    situacionvivienda: 'Casa arrendada',
    telefono_fijo: 2734567,
    contacto_emergencia: 934567890
  }
];
