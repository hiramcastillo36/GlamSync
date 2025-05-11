import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../interfaces/user.interface';

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

    login(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}/login`, user);
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.url}/register`, user);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    saveUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}
