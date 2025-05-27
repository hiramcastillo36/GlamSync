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
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SalonWithId } from '../../interfaces/salon.interface';

@Component({
  selector: 'app-mis-salones',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './mis-salones.component.html',
  styleUrl: './mis-salones.component.css'
})
export class MisSalonesComponent implements OnInit {
    salones: SalonWithId[] = [];
    isLoading: boolean = true;
    editingSalon: SalonBase | null = null;
    showServiceForm: boolean = false;
    showPackageForm: boolean = false;
    serviceForm: FormGroup;
    packageForm: FormGroup;

    constructor(private salonService: SalonService, private router: Router, private fb: FormBuilder) {
        this.serviceForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]]
        });

        this.packageForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', [Validators.required, Validators.min(0)]],
            services: [[], Validators.required]
        });
    }

    ngOnInit() {
        this.loadSalones();
    }

    loadSalones() {
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
        this.salonService.updateStatus(salon._id.toString(), { isActive: !salon.isActive }).subscribe({
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
                this.salones = this.salones.filter(s => s._id !== salon._id);
            },
            error: (error) => {
                console.error('Error deleting salon:', error);
            }
        });
    }

    editarSalon(salonId: string) {
        this.router.navigate(['/salon-edit', salonId]);
    }

    crearNuevoSalon() {
        this.router.navigate(['/create']);
    }

    toggleServiceForm(salon: SalonBase) {
        if (this.editingSalon?._id === salon._id && this.showServiceForm) {
            this.cancelarServicio();
        } else {
            this.editingSalon = salon;
            this.showServiceForm = true;
            this.showPackageForm = false;
            this.serviceForm.reset();
        }
    }

    togglePackageForm(salon: SalonBase) {
        if (this.editingSalon?._id === salon._id && this.showPackageForm) {
            this.cancelarPaquete();
        } else {
            this.editingSalon = salon;
            this.showPackageForm = true;
            this.showServiceForm = false;
            this.packageForm.reset();
        }
    }

    cancelarServicio() {
        this.showServiceForm = false;
        this.editingSalon = null;
        this.serviceForm.reset();
    }

    cancelarPaquete() {
        this.showPackageForm = false;
        this.editingSalon = null;
        this.packageForm.reset();
    }

    agregarServicio(salon: SalonBase) {
        if (this.serviceForm.valid) {
            this.salonService.addService(salon._id.toString(), this.serviceForm.value).subscribe({
                next: () => {
                    this.loadSalones();
                    this.cancelarServicio();
                },
                error: (error) => {
                    console.error('Error al agregar servicio:', error);
                    alert('No se pudo agregar el servicio. Por favor intenta de nuevo.');
                }
            });
        }
    }

    agregarPaquete(salon: SalonBase) {
        if (this.packageForm.valid) {
            this.salonService.addPackage(salon._id.toString(), this.packageForm.value).subscribe({
                next: () => {
                    this.loadSalones();
                    this.cancelarPaquete();
                },
                error: (error) => {
                    console.error('Error al agregar paquete:', error);
                    alert('No se pudo agregar el paquete. Por favor intenta de nuevo.');
                }
            });
        }
    }
}
