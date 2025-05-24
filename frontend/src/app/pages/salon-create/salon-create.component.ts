import { Component } from '@angular/core';
import { SalonService } from '../../services/salon.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-salon-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    NgFor,
    NgIf
  ],
  templateUrl: './salon-create.component.html',
  styleUrl: './salon-create.component.css'
})
export class SalonCreateComponent {
    salonForm: FormGroup;
    newService: string = '';

    workingDays = [
        { label: 'Lunes', value: 'Lunes' },
        { label: 'Martes', value: 'Martes' },
        { label: 'Miercoles', value: 'Miercoles' },
        { label: 'Jueves', value: 'Jueves' },
        { label: 'Viernes', value: 'Viernes' },
        { label: 'Sabado', value: 'Sabado' },
        { label: 'Domingo', value: 'Domingo' }
    ];

    constructor(
        private salonService: SalonService,
        private formBuilder: FormBuilder,
    ) {
        this.salonForm = this.formBuilder.group({
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
            workingHours: this.formBuilder.group({}),
            images: [[]],
            services: this.formBuilder.array([]),
            isActive: [true]
        });

        this.workingDays.forEach(day => {
            const workingHoursGroup = this.salonForm.get('workingHours') as FormGroup;
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
                new FormControl('17:00')
            );
        });
    }

    get services() {
        return this.salonForm.get('services') as FormArray;
    }

    addService() {
        if (this.newService.trim()) {
            this.services.push(this.formBuilder.control(this.newService.trim()));
            this.newService = '';
        }
    }

    removeService(index: number) {
        this.services.removeAt(index);
    }

    onSubmit() {
        if (this.salonForm.valid) {
            const formValue = this.salonForm.value;

            const workingHours: { [key: string]: string } = {};
            this.workingDays.forEach(day => {
                if (formValue.workingHours[day.value + 'Open']) {
                    workingHours[day.value] = `${formValue.workingHours[day.value + 'Start']}-${formValue.workingHours[day.value + 'End']}`;
                } else {
                    workingHours[day.value] = 'closed';
                }
            });

            const salon = {
                ...formValue,
                workingHours
            };

            this.salonService.createSalon(salon).subscribe({
                next: (response) => {
                    console.log('Salon created:', response);
                },
                error: (error) => {
                    console.error('Error creating salon:', error);
                }
            });
        }
    }
}
