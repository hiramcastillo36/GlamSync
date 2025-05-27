import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from '../../components/header/header.component';
import { ReusableStepperComponent, StepConfig } from '../../components/stepper/stepper.component';
import { Package } from '../../interfaces/package.interface';
import { Professional } from '../../interfaces/professional';
import { SalonBase } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';
import { PackageService } from '../../services/packege.service';
import { Service } from '../../interfaces/service.interface';
import { AppointmentService } from '../../services/appointment.service';
import { CreateAppointmentRequest } from '../../interfaces/appointment.interface';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    HeaderComponent,
    ReusableStepperComponent
  ],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, AfterViewInit {
  @ViewChild('serviciosTemplate', { static: true }) serviciosTemplate!: TemplateRef<any>;
  @ViewChild('fechaTemplate', { static: true }) fechaTemplate!: TemplateRef<any>;
  @ViewChild('confirmacionTemplate', { static: true }) confirmacionTemplate!: TemplateRef<any>;

  stepConfig: StepConfig[] = [];

  salon: SalonBase = {
    _id: '',
    name: '',
    address: '',
    phone: '',
    description: '',
    workingHours: [],
    image: '',
    rating: 0,
    services: [],
    packages: [],
    registerDate: new Date(),
    isActive: true,
  };

  servicios: Service[] = [];
  paquetes: Package[] = [];

  showModalFlag = false;
  modalType = 'success';
  modalTitle = '';
  modalMessage = '';


  personas: Professional[] = [
    { id: 'a1', nombre: 'Andrea', especialidad: 'Estilista y Uñas', foto: 'assets/andrea.jpg' },
    { id: 'b2', nombre: 'Carlos', especialidad: 'Manicure y Pedicure', foto: 'assets/carlos.jpg' },
    { id: 'c3', nombre: 'Fernanda', especialidad: 'Especialista en Acrílicas', foto: 'assets/fernanda.jpg' }
  ];

  horariosDisponibles = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '16:00', '17:00', '18:00'
  ];

  serviciosForm!: FormGroup;
  fechaForm!: FormGroup;
  confirmacionForm!: FormGroup;

  servicioSeleccionado: Service | null = null;
  paqueteSeleccionado: Package | null = null;
  personaSeleccionada: Professional | null = null;
  fechaSeleccionada: Date = new Date();
  horarioSeleccionado: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salonService: SalonService,
    private formBuilder: FormBuilder,
    private packageService: PackageService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.loadSalonData();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stepConfig = [
        {
          label: 'Servicios',
          content: this.serviciosTemplate,
          formGroup: this.serviciosForm
        },
        {
          label: 'Fecha y Hora',
          content: this.fechaTemplate,
          formGroup: this.fechaForm
        },
        {
          label: 'Confirmación',
          content: this.confirmacionTemplate,
          formGroup: this.confirmacionForm
        }
      ];
    });
  }

  loadSalonData(): void {
    this.route.params.subscribe(params => {
      const salonId: ID = params['id'];
      console.log('Salon ID:', salonId);

      // Cargar datos del salón
      this.salonService.getSalonById(salonId.toString()).subscribe((salon) => {
        this.salon = salon.data;
        console.log('Salon loaded:', this.salon);
      });

      // Cargar servicios
      this.salonService.getServicesBySalonId(salonId.toString()).subscribe((services) => {
        this.servicios = services.data;
        console.log('Services loaded:', this.servicios);
      });

      // Cargar paquetes
      this.packageService.getPackagesBySalonId(salonId.toString()).subscribe((packages) => {
        this.paquetes = packages.data;
        console.log('Packages loaded:', this.paquetes);
      });
    });
  }

  initForms(): void {
    this.serviciosForm = this.formBuilder.group({
      seleccion: ['', Validators.required]
    });

    this.fechaForm = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      horario: ['', Validators.required]
    });

    this.confirmacionForm = this.formBuilder.group({
      confirmado: [false, Validators.requiredTrue]
    });
  }

  onStepChange(index: number): void {
    console.log(`Cambiado al paso ${index + 1}`);
  }

  onNext(currentStep: number): void {
    console.log(`Avanzando desde el paso ${currentStep + 1}`);

    if (currentStep === 0) {
      if (!this.servicioSeleccionado && !this.paqueteSeleccionado) {
        alert('Por favor selecciona un servicio o paquete antes de continuar');
        return;
      }
      this.serviciosForm.patchValue({
        seleccion: this.paqueteSeleccionado ? 'paquete' : 'servicio'
      });
    }
  }

  onPrevious(currentStep: number): void {
    console.log(`Retrocediendo desde el paso ${currentStep + 1}`);
  }

  seleccionarServicio(servicio: Service): void {
    if (this.paqueteSeleccionado) {
      this.paqueteSeleccionado = null;
    }

    this.servicioSeleccionado = servicio;
    this.serviciosForm.patchValue({ seleccion: 'servicio' });

    console.log('Servicio seleccionado:', servicio);
  }

  seleccionarPaquete(paquete: Package): void {
    if (this.servicioSeleccionado) {
      this.servicioSeleccionado = null;
    }

    this.paqueteSeleccionado = paquete;
    this.serviciosForm.patchValue({ seleccion: 'paquete' });

    console.log('Paquete seleccionado:', paquete);
  }

  deseleccionarPaquete(): void {
    this.paqueteSeleccionado = null;
    this.serviciosForm.patchValue({ seleccion: '' });
  }

  deseleccionarServicio(): void {
    this.servicioSeleccionado = null;
    this.serviciosForm.patchValue({ seleccion: '' });
  }

  seleccionarFecha(event: Date | null): void {
    if (event) {
      this.fechaSeleccionada = event;
      this.fechaForm.patchValue({ fecha: this.fechaSeleccionada });
    }
  }

  seleccionarHorario(horario: string): void {
    this.horarioSeleccionado = horario;
    this.fechaForm.patchValue({ horario: horario });
  }

  seleccionarPersona(persona: Professional): void {
    this.personaSeleccionada = persona;
  }

  limpiarPersona(): void {
    this.personaSeleccionada = null;
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
      return this.paqueteSeleccionado.price;
    }
    return this.servicioSeleccionado ? this.servicioSeleccionado.price : 0;
  }

  onCancel(): void {
    this.router.navigate(['/salon', this.salon._id]);
  }

   showAlert(type: 'success' | 'error', title: string, message: string) {
    this.modalType = type;
    this.modalTitle = title;
    this.modalMessage = message;
    this.showModalFlag = true;
  }

  closeModal() {
    this.showModalFlag = false;
    this.router.navigate(['/mis-citas']);
  }

  onComplete(): void {
    if (this.confirmacionForm.valid && (this.servicioSeleccionado || this.paqueteSeleccionado)) {

      const appointmentDate = this.fechaSeleccionada.toISOString().split('T')[0]; // "2025-05-25"

      const appointmentData: CreateAppointmentRequest = {
        salonId: this.salon._id,
        serviceId: this.servicioSeleccionado?._id || "",
        packageId: this.paqueteSeleccionado?._id || "",
        professionalId: "",
        appointmentDate: new Date(appointmentDate),
        appointmentTime: this.horarioSeleccionado,
        totalPrice: this.getTotalPrecio(),
      };

      console.log('Datos de la cita a enviar:', appointmentData);

      this.appointmentService.createAppointment(appointmentData).subscribe({
        next: (response) => {
          console.log('Cita creada exitosamente:', response);
          this.showAlert('success', '¡Éxito!', '¡La cita ha sido creada exitosamente!');
        },
        error: (error) => {
          console.error('Error al crear la cita:', error);
          alert('Error al crear la cita. Por favor intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor completa todos los campos requeridos');
    }
  }
}
