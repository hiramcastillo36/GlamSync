import { ID } from './types';

export interface Service {
  name: string;
  price: number;
}

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
  image: string;
  rating: number;
  services: Service[];
  packages: Package[];
  registerDate: Date;
  isActive: boolean;
}

export interface PackageWithId extends Package {
  _id: ID;
}

export interface ServiceWithId extends Service {
  _id: ID;
}

export interface SalonWithId extends SalonBase {
    _id: ID;
    name: string;
    address: string;
    phone: string;
    description: string;
    workingHours: WorkingHours[];
    image: string;
    rating: number;
    services: ServiceWithId[];
    packages: PackageWithId[];
    registerDate: Date;
    isActive: boolean;
}

export interface SalonResponse {
  data: SalonWithId[];
}

export interface SalonDetailResponse {
  data: SalonBase;
}

export interface WorkingHours {
  day: string;
  time: string;
}

export interface SalonCard extends SalonBase {
  image: string;
}

export interface SalonDetail extends SalonCard {
  servicios: Service[];
  paquetes: Package[];
  image: string;
}

export interface ServiceResponse {
  data: Service[];
}
