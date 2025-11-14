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

export class ListVehiclesComponent {
  vehiculoService = inject(VehiculoService);
  router = inject(Router)

  listaVehiculos = signal<any[]>([]);

  constructor() {
    this.cargarVehiculo()
  }

  cargarVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe({
      next: (data) => {
        // Actualiza la Signal con el método .set()
        this.listaVehiculos.set(data);
      },
      error: (err) => {
        console.error("Error al cargar vehículos:", err);
      }
    });
  }

  filtro = signal("")



  vehiculosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();

    return this.listaVehiculos().filter(v => `${v.marca} ${v.modelo} ${v.anio}`.toLowerCase().includes(texto))
  })

  cargarVehiculo() {
    this.vehiculoService.getVehiculos().subscribe({
      next: (ve) => this.listaVehiculos.set(ve)
    })
  }

  eliminarVehiculoLista() {
    this.cargarVehiculo()
  }


  volver() {
    this.router.navigate([''])
  }
}
