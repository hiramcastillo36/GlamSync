import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { AppointmentStepperComponent } from '../../components/stepper/stepper.component';
import { ServiceItem } from '../../interfaces/service';
import { PackageItem } from '../../interfaces/package';
import { Professional } from '../../interfaces/professional';
import { AppointmentData } from '../../interfaces/appointment';
import { SalonDetail } from '../../interfaces/salon';
import { ID } from '../../interfaces/types';

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
    id: 1,
    nombre: 'Salon NailsByO',
    descripcion: 'El mejor salón para uñas de la ciudad',
    imagen: '/assets/images/nails.jpg',
    rating: 3,
    servicios: [],
    paquetes: []
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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
    });
  }

  onCancelAppointment(): void {
    this.router.navigate(['/salon', this.salon.id]);
  }

  onConfirmAppointment(data: AppointmentData): void {
    console.log('Cita confirmada', data);
    alert('¡Tu cita ha sido confirmada con éxito!');
    this.router.navigate(['/home']);
  }
}