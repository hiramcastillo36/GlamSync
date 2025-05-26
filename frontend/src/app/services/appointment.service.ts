import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointment, AppointmentResponse, CreateAppointmentRequest } from '../interfaces/appointment.interface';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = `${environment.apiUrl}/appointment`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    createAppointment(appointment: CreateAppointmentRequest): Observable<Appointment> {
        return this.http.post<Appointment>(`${this.apiUrl}`, appointment, { headers: this.getHeaders() });
    }

    getAppointmentsByUserId(): Observable<{ data: AppointmentResponse[] }> {
        return this.http.get<{data: AppointmentResponse[]}>(`${this.apiUrl}`, { headers: this.getHeaders() });
    }

    deleteAppointment(appointmentId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${appointmentId}`, { headers: this.getHeaders() });
    }

    getAppointmentsBySalonId(salonId: string): Observable<{ data: AppointmentResponse[] }> {
        return this.http.get<{data: AppointmentResponse[]}>(`${this.apiUrl}/salon/${salonId}`, { headers: this.getHeaders() });
    }

    getAppointmentsAdmin(): Observable<{ data: AppointmentResponse[] }> {
        return this.http.get<{data: AppointmentResponse[]}>(`${this.apiUrl}/admin`, { headers: this.getHeaders() });
    }

}
