import { ID } from './types';
import { Service } from './service.interface';

export interface Package {
  _id: ID;
  name: string;
  description: string;
  price: number;
  services: Service[];
}

export interface PackageResponse {
  data: Package[];
}
