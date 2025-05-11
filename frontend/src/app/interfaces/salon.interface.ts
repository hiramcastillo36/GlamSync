import { ID } from './types';

export interface SalonBase {
  _id: ID;
  name: string;
  address: string;
  phone: string;
  description: string;
  workingHours: string;
  images: string[];
  rating: number;
  services: string[];
  registerDate: Date;
  isActive: boolean;
}

export interface SalonCard extends SalonBase {
  imagen: string;
}

export interface SalonDetail extends SalonCard {
  servicios: string[];
  paquetes: Array<{
    _id: ID;
    nombre: string;
    imagen: string;
  }>;
}
