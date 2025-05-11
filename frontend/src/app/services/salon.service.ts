import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalonBase } from '../interfaces/salon.interface';

@Injectable({
    providedIn: 'root'
})
export class SalonService {
    private http = inject(HttpClient);
    private url: string = 'http://localhost:8080/api/salon';

    constructor() {

    }

    createSalon(salon: SalonBase): Observable<SalonBase> {
        return this.http.post<SalonBase>(this.url, salon);
    }
}
