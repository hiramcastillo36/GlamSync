import { ID } from './types';

export interface SalonBase {
  id: ID;
  nombre: string;
  descripcion: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  horarioAtencion?: string;
  edificio?: string;
  horario?: string;
}

export interface SalonCard extends SalonBase {
  imagen: string;
  rating: number;
}

export interface SalonDetail extends SalonCard {
  servicios: string[];
  paquetes: Array<{
    id: ID;
    nombre: string;
    imagen: string;
  }>;
}