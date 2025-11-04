import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-taller-component',
  imports: [FormBuilder],
  templateUrl: './taller-component.component.html',
  styleUrl: './taller-component.component.css'
})
export class TallerComponentComponent {
  fb = inject(FormBuilder)
}
