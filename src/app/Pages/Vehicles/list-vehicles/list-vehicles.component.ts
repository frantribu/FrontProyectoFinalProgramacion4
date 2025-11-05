import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehiculoPolimorfico, VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { Router } from "@angular/router";
import { CardVehiculoComponent } from '../../../Shared/Components/card-vehiculo/card-vehiculo.component';

@Component({
  selector: 'app-list-vehicles',
  imports: [CardVehiculoComponent],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.css'
})
export class ListVehiclesComponent {
  vehiculoService = inject(VehiculoService);
  router = inject(Router)

  listaVehiculos = toSignal(this.vehiculoService.getVehiculos(), { initialValue: [] })
}
