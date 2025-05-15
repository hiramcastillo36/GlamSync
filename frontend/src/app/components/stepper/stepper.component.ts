import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ServiceItem } from '../../interfaces/service';
import { PackageItem } from '../../interfaces/package';
import { Professional } from '../../interfaces/professional';
import { AppointmentData } from '../../interfaces/appointment';
import { SalonDetail } from '../../interfaces/salon.interface';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { PackageCardComponent } from '../package-card/package-card.component';
import { ProfessionalCardComponent } from '../professional-card/professional-card.component';

@Component({
  selector: 'app-appointment-stepper',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ServiceCardComponent,
    PackageCardComponent,
    ProfessionalCardComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class AppointmentStepperComponent implements OnInit {
  @Input() salon!: SalonDetail;
  @Input() servicios: ServiceItem[] = [];
  @Input() paquetes: PackageItem[] = [];
  @Input() personas: Professional[] = [];
  @Input() horariosDisponibles: string[] = [];

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<AppointmentData>();

  serviciosForm!: FormGroup;
  fechaForm!: FormGroup;
  confirmacionForm!: FormGroup;

  servicioSeleccionado: ServiceItem | null = null;
  paqueteSeleccionado: PackageItem | null = null;
  personaSeleccionada: Professional | null = null;
  fechaSeleccionada: Date = new Date();
  horarioSeleccionado: string = '';
  isPaqueteSelected = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.serviciosForm = this._formBuilder.group({
      servicio: [''],
      paquete: ['']
    }, { validator: this.servicioOrPaqueteValidator });

    this.fechaForm = this._formBuilder.group({
      fecha: ['', Validators.required],
      persona: [''],
      horario: ['', Validators.required]
    });

    this.confirmacionForm = this._formBuilder.group({
      confirmado: [false, Validators.requiredTrue]
    });

    if (this.servicios.length > 0) {
      this.seleccionarServicio(this.servicios[0]);
    }

    this.serviciosForm.get('paquete')?.valueChanges.subscribe(paqueteId => {
      if (paqueteId) {
        this.paqueteSeleccionado = this.paquetes.find(p => String(p.id) === String(paqueteId)) || null;
        this.isPaqueteSelected = true;
        if (this.servicioSeleccionado) {
          this.deseleccionarServicio();
        }
      } else {
        this.paqueteSeleccionado = null;
        this.isPaqueteSelected = false;
      }
    });
  }

  servicioOrPaqueteValidator(group: FormGroup): { [key: string]: any } | null {
    const servicio = group.get('servicio')?.value;
    const paquete = group.get('paquete')?.value;

    if (!servicio && !paquete) {
      return { 'requiredSelection': true };
    }
    return null;
  }

  isServiceSelected(servicio: ServiceItem): boolean {
    return this.servicioSeleccionado !== null &&
           String(this.servicioSeleccionado.id) === String(servicio.id);
  }

  seleccionarServicio(servicio: ServiceItem): void {
    if (this.isPaqueteSelected) return;

    if (this.servicioSeleccionado && String(this.servicioSeleccionado.id) === String(servicio.id)) {
      this.deseleccionarServicio();
    } else {
      this.servicioSeleccionado = servicio;
      this.serviciosForm.patchValue({
        servicio: servicio.id
      });
    }
  }

  deseleccionarServicio(): void {
    this.servicioSeleccionado = null;
    this.serviciosForm.patchValue({
      servicio: ''
    });
  }

  seleccionarPaquete(paquete: PackageItem): void {
    this.paqueteSeleccionado = paquete;
    this.isPaqueteSelected = true;
    this.serviciosForm.patchValue({
      paquete: paquete.id
    });

    if (this.servicioSeleccionado) {
      this.deseleccionarServicio();
    }
  }

  deseleccionarPaquete(): void {
    this.paqueteSeleccionado = null;
    this.isPaqueteSelected = false;
    this.serviciosForm.patchValue({
      paquete: ''
    });
  }

  seleccionarFecha(event: Date): void {
    this.fechaSeleccionada = event;
    this.fechaForm.patchValue({
      fecha: this.fechaSeleccionada
    });
  }

  seleccionarHorario(horario: string): void {
    this.horarioSeleccionado = horario;
    this.fechaForm.patchValue({
      horario: horario
    });
  }

  seleccionarPersona(persona: Professional | null): void {
    this.personaSeleccionada = persona;
    this.fechaForm.patchValue({
      persona: persona ? persona.id : ''
    });
  }

  limpiarPersona(): void {
    this.personaSeleccionada = null;
    this.fechaForm.patchValue({
      persona: ''
    });
  }

  getFechaMostrar(): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return this.fechaSeleccionada.toLocaleDateString('es-ES', options);
  }

  getTotalPrecio(): number {
    if (this.paqueteSeleccionado) {
      return this.paqueteSeleccionado.precio;
    }
    return this.servicioSeleccionado ? this.servicioSeleccionado.precio : 0;
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onConfirm(): void {
    if (this.confirmacionForm.valid) {
      const appointmentData: AppointmentData = {
        salon: this.salon,
        servicio: this.servicioSeleccionado,
        paquete: this.paqueteSeleccionado,
        fecha: this.fechaSeleccionada,
        horario: this.horarioSeleccionado,
        persona: this.personaSeleccionada,
        precioTotal: this.getTotalPrecio()
      };

      this.confirm.emit(appointmentData);
    }
  }
}
