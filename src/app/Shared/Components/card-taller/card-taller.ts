import { Component, input } from '@angular/core';
import { Taller } from '../../../Core/Models/Taller';

@Component({
  selector: 'app-card-taller',
  imports: [],
  templateUrl: './card-taller.html',
  styleUrl: './card-taller.css',
})
export class CardTaller {
  taller = input.required<Taller>()
  
}
