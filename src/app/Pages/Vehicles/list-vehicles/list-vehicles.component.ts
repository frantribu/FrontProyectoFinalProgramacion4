import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { Router } from "@angular/router";
import { CardVehiculoComponent } from '../../../Shared/Components/card-vehiculo/card-vehiculo.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-vehicles',
  imports: [CardVehiculoComponent, ReactiveFormsModule],
  templateUrl: './list-vehicles.component.html',
  styleUrl: './list-vehicles.component.css'
})

export class ListVehiclesComponent {
  vehiculoService = inject(VehiculoService);
  router = inject(Router)
  fb = inject(FormBuilder)

  listaVehiculos = signal<any[]>([]);

  constructor() {
    this.cargarVehiculos();
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

  filtro = signal('')

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(4)]]
  })

  vehiculosFiltrados = computed(() => {
    const texto = this.filtro().toLowerCase();

    return this.listaVehiculos().filter(v => {
      const nombre = v.marca + ' ' + v.modelo;

      return nombre.toLowerCase().includes(texto)
    })
  })

  buscar() {
    this.filtro.set(this.form.value.nombre!)
  }

  eliminarVehiculoLista() {
    this.cargarVehiculos()
  }

  volver() {
    this.router.navigate([''])
  }
}
