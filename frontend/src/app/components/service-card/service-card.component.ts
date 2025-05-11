import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ServiceItem } from '../../interfaces/service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {
  @Input() service!: ServiceItem;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() select = new EventEmitter<ServiceItem>();
  @Output() deselect = new EventEmitter<void>();
  
  onSelect(): void {
    if (!this.disabled) {
      this.select.emit(this.service);
    }
  }
  
  onDeselect(): void {
    this.deselect.emit();
  }
}