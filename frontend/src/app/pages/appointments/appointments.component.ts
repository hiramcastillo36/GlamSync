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
import { Service } from '../../interfaces/service';
import { Package } from '../../interfaces/package.interface';
import { Professional } from '../../interfaces/professional';
import { SalonDetail } from '../../interfaces/salon.interface';
import { ID } from '../../interfaces/types';
import { SalonService } from '../../services/salon.service';

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

  salon: SalonDetail = {
    _id: 1,
    name: 'Salon NailsByO',
    address: 'Calle 123',
    phone: '1234567890',
    description: 'El mejor salón para uñas de la ciudad',
    workingHours: [{day: 'L-V', time: '9:00 am - 5:00pm'}],
    image: "",
    rating: 3,
    servicios: [],
    paquetes: [],
    services: [],
    registerDate: new Date(),
    isActive: true,
    packages: [],
  };

  servicios: Service[] = [];

  paquetes: Package[] = [];

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
    private formBuilder: FormBuilder
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
    });
  }

  initForms(): void {
    this.serviciosForm = this.formBuilder.group({
      servicio: ['', Validators.required],
      paquete: ['']
    });

    this.fechaForm = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      horario: ['', Validators.required]
    });

    this.confirmacionForm = this.formBuilder.group({
      confirmado: [false, Validators.requiredTrue]
    });

    this.serviciosForm.get('paquete')?.valueChanges.subscribe(paqueteId => {
      if (paqueteId) {
        this.paqueteSeleccionado = this.paquetes.find(p => String(p.id) === String(paqueteId)) || null;
        this.servicioSeleccionado = null;
        this.serviciosForm.patchValue({ servicio: '' });
      } else {
        this.paqueteSeleccionado = null;
      }
    });
  }

  onStepChange(index: number): void {
    console.log(`Cambiado al paso ${index + 1}`);
  }

  onNext(currentStep: number): void {
    console.log(`Avanzando desde el paso ${currentStep + 1}`);
  }

  onPrevious(currentStep: number): void {
    console.log(`Retrocediendo desde el paso ${currentStep + 1}`);
  }

  seleccionarServicio(servicio: Service): void {
    this.servicioSeleccionado = servicio;
    this.paqueteSeleccionado = null;
    this.serviciosForm.patchValue({
      servicio: servicio.name,
      paquete: ''
    });
  }

  seleccionarPaquete(paquete: Package): void {
    this.paqueteSeleccionado = paquete;
    this.servicioSeleccionado = null;
    this.serviciosForm.patchValue({ servicio: 'package_' + paquete.id });
  }

  deseleccionarPaquete(): void {
    this.paqueteSeleccionado = null;
    this.serviciosForm.patchValue({ paquete: '' });
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

  onComplete(): void {
    if (this.confirmacionForm.valid) {
      const appointmentData = {
        salon: this.salon,
        servicio: this.servicioSeleccionado,
        paquete: this.paqueteSeleccionado,
        fecha: this.fechaSeleccionada,
        horario: this.horarioSeleccionado,
        persona: this.personaSeleccionada,
        precioTotal: this.getTotalPrecio()
      };

      console.log('Cita confirmada:', appointmentData);
      alert('¡Tu cita ha sido confirmada con éxito!');
      this.router.navigate(['/home']);
    }
  }
}
