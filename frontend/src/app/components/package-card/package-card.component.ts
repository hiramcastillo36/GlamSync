import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PackageItem } from '../../interfaces/package.interface';

@Component({
  selector: 'app-package-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent {
  @Input() package!: PackageItem;
  @Input() selected: boolean = false;
  @Output() select = new EventEmitter<PackageItem>();
  @Output() deselect = new EventEmitter<void>();

  onSelect(): void {
    this.select.emit(this.package);
  }

  onDeselect(): void {
    this.deselect.emit();
  }
}
