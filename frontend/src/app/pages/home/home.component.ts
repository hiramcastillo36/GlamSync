import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';
import { SalonCardComponent } from '../../components/salon-card/salon-card.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonCard } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    SalonCardComponent,
    //RatingStarsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  salones: SalonCard[] = [
    {
      id: 1,
      name: 'Salon NailsByO',
      address: 'Calle 123',
      phone: '1234567890',
      description: 'Hacemos cualquier diseño que desees',
      workingHours: '10:00 - 18:00',
      images: ['/assets/images/nails.jpg'],
      rating: 3,
      imagen: '/assets/images/nails.jpg',
      services: ['Manicure', 'Pedicure', 'Uñas Naturales'],
      registerDate: new Date(),
      isActive: true
    }
  ];

  verDetalleSalon(id: ID): void {
    this.router.navigate(['/salon', id]);
  }
}
