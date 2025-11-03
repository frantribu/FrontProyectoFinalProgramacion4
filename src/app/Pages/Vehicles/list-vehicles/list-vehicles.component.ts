import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from "@angular/router";
import { CardVehiculoComponent } from '../card-vehiculo/card-vehiculo.component';
@Component({
  selector: 'app-list-vehicles',
  imports: [MatButtonModule,CardVehiculoComponent],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.css'
})
export class ListVehiclesComponent {
  vehiculoService = inject(VehiculoService);
  router = inject(Router)

  listaVehiculos = toSignal(this.vehiculoService.getVehiculos())

  modificar(){
    this.router.navigate
  }
  
}
