import { Component, inject } from '@angular/core';
import { PersonaListComponent } from '../components/persona-list.component';
import { PersonaFormComponent } from '../components/persona-form.component';
import { PersonaStore } from '../services/persona.store';

@Component({
  selector: 'app-persona-page',
  standalone: true,
  imports: [PersonaListComponent, PersonaFormComponent],
  templateUrl: './persona-page.component.html'
})
export class PersonaPageComponent {
  store = inject(PersonaStore);
}
