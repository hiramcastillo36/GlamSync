import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-slide-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.css']
})
export class SlideMenuComponent {
  @Input() isOpen: boolean = false;
  @Output() menuClosed = new EventEmitter<void>();
  @Output() menuItemClicked = new EventEmitter<string>();

  closeMenu() {
    this.menuClosed.emit();
  }

  onMenuItemClick(item: string) {
    this.menuItemClicked.emit(item);
    this.closeMenu();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const menuElement = target.closest('.slide-menu');
    const buttonElement = target.closest('.profile-btn');
    
    if (!menuElement && !buttonElement && this.isOpen) {
      this.closeMenu();
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeMenu();
    }
  }
}