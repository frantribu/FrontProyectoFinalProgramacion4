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
    if(this.vehiculo().tipoVehiculo==="Auto"){
    this.router.navigate([`vehiculos/modificarAuto/${this.vehiculo().id}`])
    }else if(this.vehiculo().tipoVehiculo==="Moto"){
      this.router.navigate([`vehiculos/modificarMoto/${this.vehiculo().id}`])
    }
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
