import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RatingStarsComponent } from '../rating/rating.component';
import { SalonCard } from '../../interfaces/salon';
import { ID } from '../../interfaces/types';

@Component({
  selector: 'app-salon-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RatingStarsComponent
  ],
  templateUrl: './salon-card.component.html',
  styleUrls: ['./salon-card.component.css']
})
export class SalonCardComponent {
  @Input() salon!: SalonCard;
  @Output() viewDetail = new EventEmitter<ID>();
  
  onViewDetail(): void {
    this.viewDetail.emit(this.salon.id);
  }
}