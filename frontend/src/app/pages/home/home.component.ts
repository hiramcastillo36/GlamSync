import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Importaciones de Angular Material
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

  // Método para generar estrellas basadas en la calificación
  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}