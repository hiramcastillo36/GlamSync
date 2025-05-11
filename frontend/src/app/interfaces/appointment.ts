import { SalonDetail } from './salon.interface';
import { ServiceItem } from './service';
import { PackageItem } from './package';
import { Professional } from './professional';

export interface AppointmentData {
  salon: SalonDetail;
  servicio: ServiceItem | null;
  paquete: PackageItem | null;
  fecha: Date;
  horario: string;
  persona: Professional | null;
  precioTotal: number;
}
