import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./login-page.component.css'],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {
  email = '';
  password = '';
  confirmPassword = '';
  isRegisterMode = false;
  errorMessage = '';
  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit(): void {
    this.errorMessage = '';

    if (this.isRegisterMode) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden.';
        return;
      }

      this.authService.register(this.email, this.password).subscribe({
        next: () => this.router.navigate(['/personas']),
        error: (err) => {
          this.errorMessage = err?.error || 'Error al registrar.';
        }
      });
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/personas']),
      error: (err) => {
        this.errorMessage = err?.error || 'Credenciales invalidas.';
      }
    });
  }

  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.errorMessage = '';
    this.password = '';
    this.confirmPassword = '';
  }
}
