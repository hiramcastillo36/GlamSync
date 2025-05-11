import { ID } from './types';

export interface SalonBase {
  id: ID;
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
