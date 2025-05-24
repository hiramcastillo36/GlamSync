import { ID } from './types';

export interface Package {
  name: string;
  description: string;
  price: number;
}

export interface SalonBase {
  _id: ID;
  name: string;
  address: string;
  phone: string;
  description: string;
  workingHours: WorkingHours[];
  images: string[];
  rating: number;
  services: string[];
  packages: Package[];
  registerDate: Date;
  isActive: boolean;
}

export interface WorkingHours {
  day: string;
  time: string;
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
