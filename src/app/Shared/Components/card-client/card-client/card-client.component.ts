import { Component, inject, input } from '@angular/core';
import { User } from '../../../../Core/Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-client',
  imports: [],
  templateUrl: './card-client.component.html',
  styleUrl: './card-client.component.css'
})
export class CardClientComponent {
  cliente = input<User>()
  route = inject(Router)

  modificar(){
    this.route.navigate([`clientes/modificar/${this.cliente()?.id}`])
  }
}
