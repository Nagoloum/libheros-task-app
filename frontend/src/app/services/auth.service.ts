import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { AuthResponse, User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      // On pourrait décoder le JWT plus tard pour récupérer l'utilisateur
      console.log('Token trouvé dans localStorage');
    }
  }

  register(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        console.log('Inscription réussie', response);
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        console.error('Erreur inscription:', error);
        return throwError(() => error);
      })
    );
  }

  login(data: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        console.log('Connexion réussie', response);
        this.handleAuthSuccess(response);
      }),
      catchError(error => {
        console.error('Erreur connexion:', error);
        return throwError(() => error);
      })
    );
  }

  private handleAuthSuccess(response: AuthResponse) {
    localStorage.setItem('token', response.access_token);
    this.currentUserSubject.next(response.user);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}