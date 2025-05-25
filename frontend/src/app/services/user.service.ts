import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<{ success: boolean; data: User }>(`${this.apiUrl}/me`, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data)
      );
  }

  updateUser(userData: Partial<User>): Observable<User> {
    return this.http.put<{ success: boolean; data: User }>(`${this.apiUrl}/me`, userData, { headers: this.getHeaders() })
      .pipe(
        map(response => response.data)
      );
  }
}
