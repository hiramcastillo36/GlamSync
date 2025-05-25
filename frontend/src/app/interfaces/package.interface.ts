import { ID } from './types';

export interface Package {
  _id: ID;
  name: string;
  description: string;
  price: number;
  services: ID[];
}

export interface PackageResponse {
  data: Package[];
}
