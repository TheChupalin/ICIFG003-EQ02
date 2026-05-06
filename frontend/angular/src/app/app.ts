import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud-personas');
  authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
