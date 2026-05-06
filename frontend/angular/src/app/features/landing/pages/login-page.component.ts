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
  private router = inject(Router);
  private authService = inject(AuthService);

  onSubmit(): void {
    this.authService.login(this.email, this.password);
    this.router.navigate(['/personas']);
  }
}
