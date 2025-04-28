import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-salon-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.css']
})
export class SalonDetailComponent implements OnInit {
  salon = {
    id: 1,
    nombre: 'Salon NailsByO',
    direccion: 'Av. Sierra Leona #200',
    edificio: 'Edificio planta baja local 50',
    telefono: '+52 444 553 9021',
    horario: 'L-V 9:00 am - 5:00pm',
    imagen: '/assets/images/nails.jpg',
    rating: 3,
    servicios: [
      'Uñas acrílicas',
      'Gel',
      'Manicure',
      'Masaje de manos'
    ],
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
    ]
  };
  
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    
    // this.salonService.getSalon(salonId).subscribe(data => this.salon = data);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}