import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../components/header/header.component';
import { RatingStarsComponent } from '../../components/rating/rating.component';
import { SalonBase, SalonDetail, Service } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';
import { Package } from '../../interfaces/package.interface';
import { PackageService } from '../../services/packege.service';

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
  services: Service[] = [];
  packages: Package[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
    private packageService: PackageService
 ) {}

ngOnInit() {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
      this.salonService.getSalonById(salonId.toString()).subscribe((salon) => {
        this.salon = salon.data;
      });
    });

    this.route.params.subscribe(params => {
        const salonId: ID = params['id'];
        this.salonService.getServicesBySalonId(salonId.toString()).subscribe((services) => {
          this.services = services.data;
        });

        this.packageService.getPackagesBySalonId(salonId.toString()).subscribe((packages) => {
          this.packages = packages.data;
        });
      });
  }

  agendarCita(): void {
    this.router.navigate(['/salon', this.salon?._id, 'appointments']);
  }
}
