import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../components/header/header.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonDetail } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';

@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    HeaderComponent,
    RatingStarsComponent
  ],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.css']
})
export class SalonDetailComponent implements OnInit {
  salon: SalonDetail = {
    id: 1,
    name: 'Salon NailsByO',
    address: 'Calle 123',
    phone: '1234567890',
    description: 'El mejor salón para uñas de la ciudad',
    workingHours: 'L-V 9:00 am - 5:00pm',
    images: ['/assets/images/nails.jpg'],
    rating: 3,
    servicios: ['Manicure', 'Pedicure', 'Uñas Naturales'],
    paquetes: [
      {
        id: 1,
        nombre: 'Paquete Básico',
        imagen: '/assets/images/package1.jpg'
      },
      {
        id: 2,
        nombre: 'Paquete Premium',
        imagen: '/assets/images/package2.jpg'
      },
      {
        id: 3,
        nombre: 'Paquete Deluxe',
        imagen: '/assets/images/package3.jpg'
      }
    ],
    imagen: '/assets/images/nails.jpg',
    services: ['Manicure', 'Pedicure', 'Uñas Naturales'],
    registerDate: new Date(),
    isActive: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
    });
  }

  agendarCita(): void {
    this.router.navigate(['/salon', this.salon.id, 'appointments']);
  }
}
