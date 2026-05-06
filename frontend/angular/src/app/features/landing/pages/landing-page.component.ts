import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./landing-page.component.css'],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {}
