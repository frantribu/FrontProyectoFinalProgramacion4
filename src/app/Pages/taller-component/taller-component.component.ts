import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-taller-component',
  imports: [ReactiveFormsModule],
  templateUrl: './taller-component.component.html',
  styleUrl: './taller-component.component.css'
})
export class TallerComponentComponent {
  fb = inject(FormBuilder)
}
