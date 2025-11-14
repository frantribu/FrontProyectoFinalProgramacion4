import { Component, input } from '@angular/core';
import { User } from '../../../../Core/Models/User';

@Component({
  selector: 'app-card-client',
  imports: [],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.css'
})
export class CardClientComponent {
  cliente = input<User>()
}
