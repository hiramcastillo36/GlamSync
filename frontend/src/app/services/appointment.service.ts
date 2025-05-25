import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Appointment, CreateAppointmentRequest } from '../interfaces/appointment.interface';

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
}
