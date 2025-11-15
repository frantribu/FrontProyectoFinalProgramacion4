import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-card-venta',
  imports: [],
  templateUrl: './card-venta.component.html',
  styleUrl: './card-venta.component.css'
})
export class CardVentaComponent {
  historialDeVenta = input<HistorialDeVentas>()
  vehiculoService = inject(VehiculoService)

  vehiculo=signal<any>(null)

  constructor(){
    effect(()=>{
    const id=this.historialDeVenta()?.vehiculo

    if(id){
      this.vehiculoService.getVehiculoById(id).subscribe({
        next:(v)=>this.vehiculo.set(v),
        error:(err)=>console.log("Error al obtener el vehiculo ", err)
      })
    }
  })
  }

  calcularGanancia(precioCompra:number, precioVenta:number){
    return precioVenta-precioCompra;
  }
  

}
