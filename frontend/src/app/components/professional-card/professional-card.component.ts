import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Professional } from '../../interfaces/professional';

@Component({
  selector: 'app-professional-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './professional-card.component.html',
  styleUrls: ['./professional-card.component.css']
})
export class ProfessionalCardComponent {
  @Input() professional!: Professional;
  @Input() selected: boolean = false;
  @Input() isDefaultOption: boolean = false;
  @Input() disabled: boolean = false; 
  @Output() select = new EventEmitter<Professional | null>();
  
  onSelect(): void {
    if (this.isDefaultOption) {
      this.select.emit(null);
    } else {
      this.select.emit(this.professional);
    }
  }
}