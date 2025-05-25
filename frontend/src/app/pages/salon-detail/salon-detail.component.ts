import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../components/header/header.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonBase, SalonDetail } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';

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

  salon: SalonBase | undefined;
  image: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService
 ) {}

ngOnInit() {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
      this.salonService.getSalonById(salonId.toString()).subscribe((salon) => {
        this.salon = salon.data;
      });
    });
  }

  agendarCita(): void {
    this.router.navigate(['/salon', this.salon?._id, 'appointments']);
  }
}
