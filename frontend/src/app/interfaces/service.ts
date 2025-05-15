import { ID } from './types';

export interface ServiceItem {
  id: ID;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion?: number;
  categoria?: string;
  disponible?: boolean;
}