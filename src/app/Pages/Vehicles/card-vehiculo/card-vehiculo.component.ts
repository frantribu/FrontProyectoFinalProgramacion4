import { Component, inject, input } from '@angular/core';
import { Vehiculo } from '../../../Core/Models/Vehicles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-vehiculo',
  imports: [],
  templateUrl: './card-vehiculo.component.html',
  styleUrl: './card-vehiculo.component.css'
})
export class CardVehiculoComponent {
  vehiculo = input.required<Vehiculo>()
  router = inject(Router)

  modificar(){
    this.router.navigate([])
  }
}
