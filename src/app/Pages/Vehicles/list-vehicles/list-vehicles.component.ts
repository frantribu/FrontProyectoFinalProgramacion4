import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
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

  filtro = signal("")

  vehiculosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();

    return this.listaVehiculos().filter(v => `${v.marca} ${v.modelo} ${v.anio}`.toLowerCase().includes(texto))
  })

  eliminarVehiculoLista(id: string) {
    const nuevaLista = this.listaVehiculos().filter(v => v.id != id);
    this.listaVehiculos = signal(nuevaLista);
  }

  volver() {
    this.router.navigate([''])
  }
}
