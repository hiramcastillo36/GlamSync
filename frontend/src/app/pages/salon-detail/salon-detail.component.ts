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
import { AuthService } from '../../services/auth.service';

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
    
  ],
  templateUrl: './salon-detail.component.html',
  styleUrls: ['./salon-detail.component.css']
})
export class SalonDetailComponent implements OnInit {

  salon: SalonBase | undefined;
  image: File | undefined;
  services: Service[] = [];
  packages: Package[] = [];
  
  currentSlide: number = 0;
  packagesWithImages: (Package & { imageUrl: string })[] = [];

  private packageImages: string[] = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=400&h=300&fit=crop'
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
    private packageService: PackageService,
    private authService: AuthService
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
        // Asigna imágenes 
        this.packagesWithImages = this.packages.map((pkg, index) => ({
          ...pkg,
          imageUrl: this.packageImages[index % this.packageImages.length]
        }));
      });
    });
  }

  agendarCita(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/salon', this.salon?._id, 'appointments']);
  }

  // Métodos para el carrusel
  nextSlide(): void {
    if (this.packagesWithImages.length > 3) {
      const maxSlide = this.packagesWithImages.length - 3;
      this.currentSlide = Math.min(this.currentSlide + 1, maxSlide);
    }
  }

  prevSlide(): void {
    if (this.packagesWithImages.length > 0) {
      this.currentSlide = Math.max(this.currentSlide - 1, 0);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}