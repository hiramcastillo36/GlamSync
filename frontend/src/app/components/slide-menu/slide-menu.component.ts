import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';


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

  constructor(private router: Router, private authService: AuthService) {}

  closeMenu() {
    this.menuClosed.emit();
  }

  logout() {
   this.authService.logout(); 
  }
}
