import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() maxStars: number = 5;
  
  get stars(): number[] {
    return Array(this.maxStars).fill(0).map((_, i) => i < this.rating ? 1 : 0);
  }
}