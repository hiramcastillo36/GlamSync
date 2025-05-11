import { ID } from './types';

export interface PackageItem {
  id: ID;
  nombre: string;
  descripcion: string;
  precio: number;
  servicios?: ID[];
  duracionTotal?: number;
  descuento?: number;
  disponible?: boolean;
}