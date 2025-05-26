// header.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ID } from '../../interfaces/types';
import { SlideMenuComponent } from '../slide-menu/slide-menu.component';
import { AuthService } from '../../services/auth.service';
import { AuthResponse, User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    SlideMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() showBreadcrumb: boolean = false;
  @Input() salonId: ID | null = null;
  @Input() salonName: string | null = null;
  @Input() currentPage: string | null = null;

  isMenuOpen: boolean = false;
  currentUser: User | null = null;
  userInitials: string = '';
  loading = true;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.loading = true;
    this.error = null;

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.error = 'Error loading user data';
        this.loading = false;
      }
    });
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'Usuario';
    return this.currentUser.email.split('@')[0];
  }

  toggleMenu() {
    
    if (!this.authService.isAuthenticated()) {
    this.router.navigate(['/login']);
    return;
  }
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onMenuItemClick(item: string) {
    switch(item) {
      case 'profile':
        this.router.navigate(['/profile']);
        break;
      case 'settings':
        this.router.navigate(['/settings']);
        break;
      case 'logout':
        this.logout();
        break;
    }
    this.closeMenu();
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
  }
}

