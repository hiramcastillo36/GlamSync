import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalonBase, SalonCard, SalonDetail, SalonDetailResponse, SalonResponse } from '../interfaces/salon.interface';
import { environment } from '../../environments/environment';
import { ServiceResponse } from '../interfaces/service.interface';

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    private apiUrl = `${environment.apiUrl}/salon`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    createSalon(salonData: SalonBase): Observable<any> {
        return this.http.post(this.apiUrl, salonData, { headers: this.getHeaders() });
    }

    getSalonById(id: string): Observable<SalonDetailResponse> {
        return this.http.get<SalonDetailResponse>(`${this.apiUrl}/${id}`);
    }

    updateSalon(id: string, salonData: Partial<SalonBase>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, salonData, { headers: this.getHeaders() });
    }

    deleteSalon(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    getAllSalons(): Observable<SalonResponse> {
        return this.http.get<SalonResponse>(this.apiUrl, { params: { isActive: true } });
    }

    getMySalones(): Observable<SalonResponse> {
        return this.http.get<SalonResponse>(`${this.apiUrl}/admin`, { headers: this.getHeaders() });
    }

    getServicesBySalonId(id: string): Observable<ServiceResponse> {
        return this.http.get<ServiceResponse>(`http://localhost:8080/api/service/salon/${id}`, {headers: this.getHeaders()});
    }

    updateStatus(id: string, status: { isActive: boolean }): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}/active`, status, { headers: this.getHeaders() });
    }

    updateRating(appointmentId: string, rating: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/${appointmentId}/rating`, { rating }, { headers: this.getHeaders() });
    }
}
