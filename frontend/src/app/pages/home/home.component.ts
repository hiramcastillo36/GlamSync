import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';
import { SalonCardComponent } from '../../components/salon-card/salon-card.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonCard } from '../../interfaces/salon';
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
      nombre: 'Salon NailsByO',
      descripcion: 'Hacemos cualquier diseño que desees',
      imagen: '/assets/images/nails.jpg',
      rating: 3
    },
    {
      id: 2,
      nombre: 'SalonByRM',
      descripcion: 'Hacemos cualquier diseño que desees',
      imagen: '/assets/images/hair.jpg',
      rating: 3
    },
    {
      id: 3,
      nombre: 'Barbería',
      descripcion: 'Hacemos cualquier diseño que desees',
      imagen: '/assets/images/barber.jpg',
      rating: 3
    }
  ];

  verDetalleSalon(id: ID): void {
    this.router.navigate(['/salon', id]);
  }
}