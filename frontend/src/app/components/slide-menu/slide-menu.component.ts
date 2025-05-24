import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatListModule
  ],
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent {
  @Input() isOpen: boolean = false;
  @Output() menuClosed = new EventEmitter<void>();
  @Output() menuItemClicked = new EventEmitter<string>();

  constructor(private router: Router) {}

  closeMenu() {
    this.menuClosed.emit();
  }
}
