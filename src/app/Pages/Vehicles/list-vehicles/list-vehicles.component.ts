import { Component, computed, effect, inject, signal } from '@angular/core';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { Router } from "@angular/router";
import { CardVehiculoComponent } from '../../../Shared/Components/card-vehiculo/card-vehiculo.component';

@Component({
  selector: 'app-list-vehicles',
  imports: [CardVehiculoComponent],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.css'
})

export class ListVehiclesComponent{
  vehiculoService = inject(VehiculoService);
  router = inject(Router)

  listaVehiculos = signal<any[]>([])

  filtro = signal("")

  constructor(){
    this.cargarVehiculo()
  }

  vehiculosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();

    return this.listaVehiculos().filter(v => `${v.marca} ${v.modelo} ${v.anio}`.toLowerCase().includes(texto))
  })

  cargarVehiculo(){
    this.vehiculoService.getVehiculos().subscribe({
      next:(ve)=>this.listaVehiculos.set(ve)
    })
  } 
  
  eliminarVehiculoLista() {
    this.cargarVehiculo()
  }

  volver() {
    this.router.navigate([''])
  }
}
