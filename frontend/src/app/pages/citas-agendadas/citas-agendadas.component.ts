import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-citas-agendadas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    HeaderComponent,
  ],
  templateUrl: './citas-agendadas.component.html',
  styleUrls: ['./citas-agendadas.component.css']
})
export class CitasAgendadasComponent implements OnInit {
  citasAgendadas: any[] = [];
  isLoading: boolean = false;
  selectedStatus: string = 'all';

  statusOptions = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendientes' },
    { value: 'confirmed', label: 'Confirmadas' },
    { value: 'completed', label: 'Completadas' },
    { value: 'cancelled', label: 'Canceladas' }
  ];

  constructor() {}

  ngOnInit() {
    this.loadCitasAgendadas();
  }

  get filteredCitas() {
    return this.citasAgendadas;
  }

  loadCitasAgendadas() {
  }

  formatearFecha(fecha: Date) {
    return new Date(fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  formatearHora(hora: string) {
    return hora.split(':')[0] + ':' + hora.split(':')[1];
  }

  getStatusInfo(status: string) {
    return { label: 'Estado', color: '#666' };
  }

  changeAppointmentStatus(cita: any, newStatus: string) {
  }

  contactarCliente(telefono: string) {
  }

  eliminarCita(cita: any) {
  }
}