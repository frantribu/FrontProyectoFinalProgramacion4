import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-home',
  imports: [RouterLink],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  imagen = input.required<string>();
  titulo = input.required<string>();
  button1 = input.required<string>();
  button2 = input.required<string>();
  rutaButton1 = input.required<string>();
  rutaButton2 = input.required<string>();
}
