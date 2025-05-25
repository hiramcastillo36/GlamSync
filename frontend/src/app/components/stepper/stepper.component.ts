import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface StepConfig {
  label: string;
  content: TemplateRef<any>;
  formGroup?: FormGroup;
}

@Component({
  selector: 'app-reusable-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
  ],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class ReusableStepperComponent {
  @Input() steps: StepConfig[] = [];
  @Input() backButtonText: string = 'ATRÁS';
  @Input() continueButtonText: string = 'CONTINUAR';
  @Input() completeButtonText: string = 'COMPLETAR';
  @Input() showCancelButton: boolean = false;
  @Input() cancelButtonText: string = 'CANCELAR';
  
  @Output() cancel = new EventEmitter<void>();
  @Output() complete = new EventEmitter<void>();
  @Output() stepChange = new EventEmitter<number>();
  @Output() next = new EventEmitter<number>();
  @Output() previous = new EventEmitter<number>();

  onCancel(): void {
    this.cancel.emit();
  }

  onComplete(): void {
    this.complete.emit();
  }

  onStepChange(index: number): void {
    this.stepChange.emit(index);
  }

  onNext(currentStep: number): void {
    this.next.emit(currentStep);
  }

  onPrevious(currentStep: number): void {
    this.previous.emit(currentStep);
  }

  isStepCompleted(step: StepConfig): boolean {
    if (!step.formGroup) return true;
    return step.formGroup.valid;
  }

  isStepInvalid(step: StepConfig): boolean {
    if (!step.formGroup) return false;
    return step.formGroup.invalid;
  }

  nextStep(stepper: any, currentIndex: number): void {
    stepper.next();
    this.onNext(currentIndex);
  }

  previousStep(stepper: any, currentIndex: number): void {
    stepper.previous();
    this.onPrevious(currentIndex);
  }
}