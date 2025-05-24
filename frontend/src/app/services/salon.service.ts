import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalonBase, SalonCard, SalonDetail } from '../interfaces/salon.interface';
import { environment } from '../../environments/environment';

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

    getSalonById(id: string): Observable<SalonDetail> {
        return this.http.get<SalonDetail>(`${this.apiUrl}/${id}`);
    }

    updateSalon(id: string, salonData: Partial<SalonBase>): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, salonData, { headers: this.getHeaders() });
    }

    deleteSalon(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    getAllSalons(): Observable<SalonCard[]> {
        return this.http.get<SalonCard[]>(this.apiUrl);
    }
}
