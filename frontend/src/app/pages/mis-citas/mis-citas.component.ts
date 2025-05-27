import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from '../../components/header/header.component';
import { Appointment, AppointmentResponse } from '../../interfaces/appointment.interface';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SalonService } from '../../services/salon.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    HeaderComponent,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  citas: AppointmentResponse[] = [];
  isLoading: boolean = true;
  ratingForm: FormGroup;
  editForm: FormGroup;
  editingCita: AppointmentResponse | null = null;
  horariosDisponibles = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '16:00', '17:00', '18:00'
  ];

  constructor(
    private appointmentService: AppointmentService,
    private salonService: SalonService,
    private fb: FormBuilder
  ) {
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCitas();
  }

  loadCitas() {
    this.appointmentService.getAppointmentsByUserId().subscribe((citas) => {
      console.log(citas);
      this.citas = citas.data;
    });
    this.isLoading = false;
  }

  formatearFecha(fecha: Date) {
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatearHora(hora: string) {
    return hora.split(':')[0] + ':' + hora.split(':')[1];
  }

  eliminarCita(citaId: string) {
    this.appointmentService.deleteAppointment(citaId).subscribe({
      next: () => {
        this.loadCitas();
      }
    });
  }

  calificarCita(citaId: string, rating: number) {
    if (this.ratingForm.valid) {
      this.salonService.updateRating(citaId, rating).subscribe({
        next: () => {
          this.loadCitas();
          this.ratingForm.reset();
        },
        error: (error) => {
          console.error('Error al calificar:', error);
          alert('No se pudo calificar la cita. Por favor intenta de nuevo.');
        }
      });
    }
  }

  toggleEditForm(cita: AppointmentResponse) {
    if (this.editingCita?._id === cita._id) {
      this.cancelarEdicion();
    } else {
      this.editingCita = cita;
      this.editForm.patchValue({
        fecha: new Date(cita.appointmentDate),
        hora: cita.appointmentTime
      });
    }
  }

  cancelarEdicion() {
    this.editingCita = null;
    this.editForm.reset();
  }

  actualizarCita(citaId: string) {
    if (this.editForm.valid) {
      const { fecha, hora } = this.editForm.value;
      const appointmentDate = fecha.toISOString().split('T')[0];

      this.appointmentService.updateAppointment(citaId, {
        appointmentDate: new Date(appointmentDate),
        appointmentTime: hora
      }).subscribe({
        next: () => {
          this.loadCitas();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.error('Error al actualizar la cita:', error);
          alert('No se pudo actualizar la cita. Por favor intenta de nuevo.');
        }
      });
    }
  }
}
