import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PackageResponse } from '../interfaces/package.interface';

@Injectable({
    providedIn: 'root'
})
export class PackageService {
    private apiUrl = `${environment.apiUrl}/package`;

    constructor(private http: HttpClient) { }

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    getPackagesBySalonId(id: string): Observable<PackageResponse> {
        return this.http.get<PackageResponse>(`http://localhost:8080/api/package/salon/${id}`, {headers: this.getHeaders()});
    }
}
