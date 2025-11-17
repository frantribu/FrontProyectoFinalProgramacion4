import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { VehiculoPolimorfico, VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-card-venta',
  imports: [],
  templateUrl: './card-venta.component.html',
  styleUrl: './card-venta.component.css'
})
export class CardVentaComponent {
  historialDeVenta = input<HistorialDeVentas>()
  vehiculoService = inject(VehiculoService)
  userService=inject(UserServiceService)

  vehiculo = signal<VehiculoPolimorfico>(null!)
  cliente=signal<User>(null!)
  
  constructor() {
    effect(() => {
      const id = this.historialDeVenta()?.vehiculo

      if (id) {
        this.vehiculoService.getVehiculoById(id).subscribe({
          next: (v) => this.vehiculo.set(v),
          error: (err) => console.log("Error al obtener el vehiculo ", err)
        })
      }
    })

    effect(()=>{
      const id=this.historialDeVenta()?.cliente

      if(id){
        this.userService.getUserById(id).subscribe({
          next:(c)=>this.cliente.set(c),
          error:(err)=>console.log("Error al obtener el cliente", err)
        })
      }
    })
  }

  getResultado(precioDeCompra: number, precioDeVenta: number){
    return precioDeCompra>precioDeVenta ? "Perdida: " : "Ganancia: "
  }

  calcularGanancia(precioDeCompra: number, precioDeVenta: number) {
    return precioDeVenta-precioDeCompra;
  }
}


