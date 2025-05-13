import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AppointmentStepperComponent } from '../../components/stepper/stepper.component';
import { ServiceItem } from '../../interfaces/service';
import { PackageItem } from '../../interfaces/package';
import { Professional } from '../../interfaces/professional';
import { AppointmentData } from '../../interfaces/appointment';
import { SalonDetail } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';
@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    AppointmentStepperComponent
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  salon: SalonDetail = {
    _id: 1,
    name: 'Salon NailsByO',
    address: 'Calle 123',
    phone: '1234567890',
    description: 'El mejor salón para uñas de la ciudad',
    workingHours: [{day: 'L-V', time: '9:00 am - 5:00pm'}],
    images: ['/assets/images/nails.jpg'],
    rating: 3,
    servicios: [],
    paquetes: [],
    imagen: '/assets/images/nails.jpg',
    services: [],
    registerDate: new Date(),
    isActive: true
  };

  servicios: ServiceItem[] = [
    { id: 1, nombre: 'Estilista', descripcion: 'Este servicio es un corte de cabello', precio: 250 },
    { id: 2, nombre: 'Uñas acrílicas', descripcion: 'Aplicación de uñas acrílicas', precio: 350 },
    { id: 3, nombre: 'Gel', descripcion: 'Aplicación de gel en uñas', precio: 300 },
    { id: 4, nombre: 'Manicure', descripcion: 'Manicure tradicional', precio: 200 }
  ];

  paquetes: PackageItem[] = [
    { id: 'p1', nombre: 'Combo Belleza (Uñas + Gel)', precio: 550, descripcion: 'Incluye uñas acrílicas y aplicación de gel' },
    { id: 'p2', nombre: 'Spa Manos (Manicure + Tratamiento)', precio: 350, descripcion: 'Incluye manicure tradicional y tratamiento hidratante' }
  ];

  personas: Professional[] = [
    { id: 'a1', nombre: 'Andrea', especialidad: 'Estilista y Uñas', foto: 'assets/andrea.jpg' },
    { id: 'b2', nombre: 'Carlos', especialidad: 'Manicure y Pedicure', foto: 'assets/carlos.jpg' },
    { id: 'c3', nombre: 'Fernanda', especialidad: 'Especialista en Acrílicas', foto: 'assets/fernanda.jpg' }
  ];

  horariosDisponibles = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '16:00', '17:00', '18:00'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
      this.salonService.getSalonById(salonId.toString()).subscribe((salon) => {
        this.salon = {
            _id: salon._id,
            name: salon.name,
            address: salon.address,
            phone: salon.phone,
            description: salon.description,
            workingHours: salon.workingHours,
            images: salon.images,
            rating: salon.rating,
            servicios: salon.services,
            paquetes: [],
            imagen: salon.images[0],
            services: [],
            registerDate: salon.registerDate,
            isActive: salon.isActive
        };
      });
    });
  }

  onCancelAppointment(): void {
    this.router.navigate(['/salon', this.salon._id]);
  }

  onConfirmAppointment(data: AppointmentData): void {
    console.log('Cita confirmada', data);
    alert('¡Tu cita ha sido confirmada con éxito!');
    this.router.navigate(['/home']);
  }
}
