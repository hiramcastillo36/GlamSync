import { Component, OnInit, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SalonService } from '../../services/salon.service';
import { HeaderComponent } from '../../components/header/header.component';
import { ReusableStepperComponent, StepConfig } from '../../components/stepper/stepper.component';

@Component({
  selector: 'app-salon-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    HeaderComponent,
    ReusableStepperComponent
  ],
  templateUrl: './salon-create.component.html',
  styleUrls: ['./salon-create.component.css']
})
export class SalonCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('basicInfoTemplate', { static: true }) basicInfoTemplate!: TemplateRef<any>;
  @ViewChild('servicesTemplate', { static: true }) servicesTemplate!: TemplateRef<any>;
  @ViewChild('confirmationTemplate', { static: true }) confirmationTemplate!: TemplateRef<any>;
  
  stepConfig: StepConfig[] = [];
  
  basicInfoForm!: FormGroup;
  servicesForm!: FormGroup;
  confirmationForm!: FormGroup;
  
  newService: string = '';
  newPackageName: string = '';
  newPackageDescription: string = '';
  newPackagePrice: number = 0;
  imagePreview: string | undefined;
  
  workingDays = [
    { label: 'Lunes', value: 'monday' },
    { label: 'Martes', value: 'tuesday' },
    { label: 'Miércoles', value: 'wednesday' },
    { label: 'Jueves', value: 'thursday' },
    { label: 'Viernes', value: 'friday' },
    { label: 'Sábado', value: 'saturday' },
    { label: 'Domingo', value: 'sunday' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private salonService: SalonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForms();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stepConfig = [
        {
          label: 'Información Básica',
          content: this.basicInfoTemplate,
          formGroup: this.basicInfoForm
        },
        {
          label: 'Servicios y Paquetes',
          content: this.servicesTemplate,
          formGroup: this.servicesForm
        },
        {
          label: 'Confirmación',
          content: this.confirmationTemplate,
          formGroup: this.confirmationForm
        }
      ];
    });
  }
  
  initForms(): void {
    this.basicInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        building: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipCode: ['', Validators.required]
      }),
      phone: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [''],
      workingHours: this.formBuilder.group({})
    });

    this.workingDays.forEach(day => {
      const workingHoursGroup = this.basicInfoForm.get('workingHours') as FormGroup;
      workingHoursGroup.addControl(
        day.value + 'Open',
        new FormControl(true)
      );
      workingHoursGroup.addControl(
        day.value + 'Start',
        new FormControl('09:00')
      );
      workingHoursGroup.addControl(
        day.value + 'End',
        new FormControl('18:00')
      );
    });
    
    this.servicesForm = this.formBuilder.group({
      services: this.formBuilder.array([], Validators.minLength(1)),
      packages: this.formBuilder.array([])
    });
    
    this.confirmationForm = this.formBuilder.group({
      confirmed: [false, Validators.requiredTrue]
    });
  }
  
  get services() {
    return this.servicesForm.get('services') as FormArray;
  }
  
  get packages() {
    return this.servicesForm.get('packages') as FormArray;
  }
  
  addService(): void {
    if (this.newService.trim()) {
      const serviceControl = this.formBuilder.control(this.newService.trim(), Validators.required);
      this.services.push(serviceControl);
      this.newService = '';
      
      this.servicesForm.markAsDirty();
      this.servicesForm.updateValueAndValidity();
    }
  }
  
  removeService(index: number): void {
    this.services.removeAt(index);
    
    this.servicesForm.markAsDirty();
    this.servicesForm.updateValueAndValidity();
  }
  
  addPackage(): void {
    if (this.newPackageName.trim() && this.newPackageDescription.trim() && this.newPackagePrice > 0) {
      const packageControl = this.formBuilder.group({
        name: [this.newPackageName.trim(), Validators.required],
        description: [this.newPackageDescription.trim(), Validators.required],
        price: [this.newPackagePrice, [Validators.required, Validators.min(1)]]
      });
      
      this.packages.push(packageControl);
      
      this.newPackageName = '';
      this.newPackageDescription = '';
      this.newPackagePrice = 0;
      
      this.servicesForm.markAsDirty();
      this.servicesForm.updateValueAndValidity();
    }
  }
  
  removePackage(index: number): void {
    this.packages.removeAt(index);
    
    this.servicesForm.markAsDirty();
    this.servicesForm.updateValueAndValidity();
  }
  
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('El archivo es demasiado grande. El tamaño máximo es 5MB.');
        return;
      }
      
      this.basicInfoForm.patchValue({
        imageFile: file
      });
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getFormattedAddress(): string {
    const addressData = this.basicInfoForm.get('address')?.value;
    if (!addressData) return 'No especificada';
    
    const parts = [
      addressData.street,
      addressData.building,
      addressData.city,
      addressData.state,
      addressData.zipCode ? `CP ${addressData.zipCode}` : ''
    ].filter(part => part && part.trim());
    
    return parts.length > 0 ? parts.join(', ') : 'No especificada';
  }

  onStepChange(index: number): void {
    console.log(`Cambiado al paso ${index + 1}`);
    
    if (index === 1) {
      console.log('Entrando al paso de servicios');
    } else if (index === 2) {
      console.log('Entrando al paso de confirmación');
    }
  }

  onNext(currentStep: number): void {
    console.log(`Avanzando desde el paso ${currentStep + 1}`);
    
    if (currentStep === 0) {
      this.basicInfoForm.markAllAsTouched();
    } else if (currentStep === 1) {
      this.servicesForm.markAllAsTouched();
    }
  }

  onPrevious(currentStep: number): void {
    console.log(`Retrocediendo desde el paso ${currentStep + 1}`);
  }
  
  onCancel(): void {
    const hasData = this.basicInfoForm.dirty || this.servicesForm.dirty || this.confirmationForm.dirty;
    
    if (hasData) {
      if (confirm('¿Estás seguro de que deseas cancelar? Los datos ingresados se perderán.')) {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }
  
  onCreateSalon(): void {
    this.basicInfoForm.markAllAsTouched();
    this.servicesForm.markAllAsTouched();
    this.confirmationForm.markAllAsTouched();
    
    if (!this.basicInfoForm.valid) {
      alert('Por favor completa toda la información básica requerida.');
      return;
    }
    
    if (!this.servicesForm.valid || this.services.length === 0) {
      alert('Por favor agrega al menos un servicio.');
      return;
    }
    
    if (!this.confirmationForm.valid) {
      alert('Por favor confirma que los datos son correctos.');
      return;
    }
    
    try {
      const formattedWorkingHours: { [key: string]: string } = {};
      
      this.workingDays.forEach(day => {
        const isOpen = this.basicInfoForm.get('workingHours.' + day.value + 'Open')?.value;
        if (isOpen) {
          const start = this.basicInfoForm.get('workingHours.' + day.value + 'Start')?.value;
          const end = this.basicInfoForm.get('workingHours.' + day.value + 'End')?.value;
          formattedWorkingHours[day.value] = `${start}-${end}`;
        } else {
          formattedWorkingHours[day.value] = 'closed';
        }
      });
      
      const addressData = this.basicInfoForm.get('address')?.value;
      const formattedAddress = this.getFormattedAddress();
      
      const servicesArray = this.services.controls.map(control => control.value);
      const packagesArray = this.packages.controls.map(control => ({
        name: control.get('name')?.value,
        description: control.get('description')?.value,
        price: control.get('price')?.value
      }));
      
      const salonData = {
        _id: '', 
        name: this.basicInfoForm.get('name')?.value,
        address: formattedAddress,
        phone: this.basicInfoForm.get('phone')?.value,
        description: this.basicInfoForm.get('description')?.value,
        workingHours: JSON.stringify(formattedWorkingHours),
        images: [], 
        rating: 0, 
        services: servicesArray,
        packages: packagesArray, 
        registerDate: new Date(),
        isActive: true
      };
      
      console.log('Datos del salón a crear:', salonData);
      
      this.salonService.createSalon(salonData).subscribe({
        next: (response) => {
          console.log('Salon created successfully:', response);
          alert('¡El salón ha sido creado exitosamente!');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error creating salon:', error);
          alert('Error al crear el salón. Por favor, inténtalo de nuevo.');
        }
      });
      
    } catch (error) {
      console.error('Error processing salon data:', error);
      alert('Error al procesar los datos. Por favor, revisa la información e inténtalo de nuevo.');
    }
  }
}