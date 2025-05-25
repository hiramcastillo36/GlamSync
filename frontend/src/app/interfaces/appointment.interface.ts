import { SalonDetail, Service } from './salon.interface';
import { ServiceItem } from './service.interface';
import { Package } from './package.interface';
import { Professional } from './professional';
import { ID } from './types';

export interface AppointmentData {
  salon: SalonDetail;
  servicio: Service | null;
  paquete: Package | null;
  fecha: Date;
  hora: string;
  precioTotal: number;
}

export interface Appointment {
  _id: ID;
  salon: SalonDetail;
  servicio: Service | null;
  paquete: Package | null;
  fecha: Date;
  hora: string;
  precioTotal: number;
}


export interface CreateAppointmentRequest {
  salonId: ID;
  serviceId: ID;
  packageId: ID;
  professionalId: ID;
  appointmentDate: Date;
  appointmentTime: string;
  totalPrice: number;
}
