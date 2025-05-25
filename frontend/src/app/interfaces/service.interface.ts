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

export interface Service {
    _id: ID;
    name: string;
    price: number;
  }

  export interface ServiceResponse {
    data: Service[];
  }
