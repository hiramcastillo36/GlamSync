// header.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTooltipModule,
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
    this.checkAuthenticationStatus();
  }

  checkAuthenticationStatus() {
    if (this.authService.isAuthenticated()) {
      this.loadUserData();
    } else {
      this.currentUser = null;
      this.loading = false;
    }
  }

  loadUserData() {
    this.loading = true;
    this.error = null;

    const localUser = this.authService.getUser();
    if (localUser && localUser._id) {
      this.currentUser = localUser;
      this.loading = false;
      return;
    }

    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.authService.saveUser(user);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.error = 'Error loading user data';
        this.currentUser = null;
        this.loading = false;
      }
    });
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated() && this.currentUser !== null;
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'Usuario';
    return this.currentUser.email.split('@')[0];
  }

  getUserEmail(): string {
    return this.currentUser?.email || '';
  }

  login() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.closeMenu();
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
      default:
        console.log('Menu item clicked:', item);
    }
    this.closeMenu();
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.closeMenu();
  }

  goToSettings() {
    this.router.navigate(['/settings']);
    this.closeMenu();
  }
}

