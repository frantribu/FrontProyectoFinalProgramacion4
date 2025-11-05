import { Component, inject, input } from '@angular/core';
import { Vehiculo } from '../../../Core/Models/Vehicles';
import { Router } from '@angular/router';
import { VehiculoPolimorfico } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';

@Component({
  selector: 'app-card-vehiculo',
  imports: [],
  templateUrl: './card-vehiculo.component.html',
  styleUrl: './card-vehiculo.component.css'
})
export class CardVehiculoComponent {
  vehiculo = input.required<VehiculoPolimorfico>()
  router = inject(Router)
  
  modificar() {
    this.router.navigate([])
    this.vehiculo().tipoVehiculo
  }

  verDetalleVehiculo(vehiculo: VehiculoPolimorfico) {
    if (vehiculo.tipoVehiculo == 'Auto') {
      this.router.navigate([])
    }
    else {
      this.router.navigate([])
    }
  }

}
