import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8882/api/v1/auth';
  private authUserSignal = signal<AuthUser | null>(this.loadUser());
  isAuthenticated$ = computed(() => !!this.authUserSignal());

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(user => this.setUser(user))
    );
  }

  register(email: string, password: string): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.apiUrl}/register`, { email, password }).pipe(
      tap(user => this.setUser(user))
    );
  }

  logout(): void {
    this.authUserSignal.set(null);
    localStorage.removeItem('auth_user');
  }

  private setUser(user: AuthUser) {
    this.authUserSignal.set(user);
    localStorage.setItem('auth_user', JSON.stringify(user));
  }

  private loadUser(): AuthUser | null {
    const raw = localStorage.getItem('auth_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }
}
