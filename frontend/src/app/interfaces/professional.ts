import { ID } from './types';

export interface Professional {
  id: ID;
  nombre: string;
  especialidad: string;
  foto?: string;
}