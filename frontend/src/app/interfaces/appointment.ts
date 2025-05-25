import { SalonDetail, Service } from './salon.interface';
import { ServiceItem } from './service';
import { Package } from './package.interface';
import { Professional } from './professional';

export interface AppointmentData {
  salon: SalonDetail;
  servicio: Service | null;
  paquete: Package | null;
  fecha: Date;
  horario: string;
  persona: Professional | null;
  precioTotal: number;
}
