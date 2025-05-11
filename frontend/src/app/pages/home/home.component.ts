import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}
  
  salones = [
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

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  verDetalleSalon(id: number): void {
    this.router.navigate(['/salon', id]);
  }
}