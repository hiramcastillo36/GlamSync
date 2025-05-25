import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../components/header/header.component';
import { SalonCardComponent } from '../../components/salon-card/salon-card.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonBase, SalonCard } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  salones: SalonCard[] = [];

  constructor(private router: Router, private salonService: SalonService) {
    this.salonService.getAllSalons().subscribe((salones) => {
      console.log(salones);
      this.salones = salones.data.map((salon) => ({
        ...salon,
        image: salon.image
      }));
    });
    }

  verDetalleSalon(id: ID): void {
    this.router.navigate(['/salon', id]);
  }
}
