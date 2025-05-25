import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SalonService } from '../../services/salon.service';
import { SalonBase } from '../../interfaces/salon.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-salones',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatListModule, HeaderComponent],
  templateUrl: './mis-salones.component.html',
  styleUrl: './mis-salones.component.css'
})
export class MisSalonesComponent implements OnInit {
    salones: SalonBase[] = [];

    isLoading: boolean = true;
    constructor(private salonService: SalonService, private router: Router) {}

    ngOnInit() {
        this.salonService.getMySalones().subscribe({
            next: (salones) => {
                console.log(salones);
                this.salones = salones.data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error loading salones:', error);
            },
            complete: () => {
                this.isLoading = false;
            }
        });
    }

    verDetalleSalon(salonId: string) {
        this.router.navigate(['/salon-detail', salonId]);
    }

    toggleSalonStatus(salon: SalonBase) {
        this.salonService.updateSalon(salon._id.toString(), { isActive: !salon.isActive }).subscribe({
            next: () => {
                salon.isActive = !salon.isActive;
            }
        });
    }

    formatearFecha(fecha: Date) {
        return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    eliminarSalon(salon: SalonBase, index: number) {
        this.salonService.deleteSalon(salon._id.toString()).subscribe({
            next: () => {
                this.salones.splice(index, 1);
            }
        });
    }

    editarSalon(salonId: string) {
        this.router.navigate(['/salon-edit', salonId]);
    }

    crearNuevoSalon() {
        this.router.navigate(['/create']);
    }


}
