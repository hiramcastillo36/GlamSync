// auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse, User } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private user: User;
    private url: string = 'http://localhost:8080/api/auth';

    constructor() {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }

    login(user: User): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.url}/login`, user);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}/register`, user);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    saveUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
    }

    getUser(): User {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user._id ? user : {} as User;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getUser();
        return token !== null && token !== '' && user._id !== undefined;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.user = {} as User;
        this.router.navigate(['/login']);
    }

    getProtectedData(): Observable<any> {
        return this.http.get(`${this.url.replace('/auth', '')}/protected-endpoint`);
    }
}
