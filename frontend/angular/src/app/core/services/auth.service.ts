import { Injectable } from '@angular/core';
import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSignal = signal(false);
  isAuthenticated$ = computed(() => this.isAuthenticatedSignal());

  login(email: string, password: string): void {
    // Mock login - en producción aquí iría validación real
    if (email && password) {
      this.isAuthenticatedSignal.set(true);
    }
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
  }
}
