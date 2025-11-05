import { Component, inject, input, output } from '@angular/core';
import { Vehiculo } from '../../../Core/Models/Vehicles';
import { Router } from '@angular/router';
import { VehiculoPolimorfico } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { MotoService } from '../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';

@Component({
  selector: 'app-card-vehiculo',
  imports: [],
  templateUrl: './card-vehiculo.component.html',
  styleUrl: './card-vehiculo.component.css'
})
export class CardVehiculoComponent {
  vehiculo = input.required<VehiculoPolimorfico>()
  router = inject(Router)
  motoService=inject(MotoService)
  vehiculoEliminado=output<string>()

  modificar() {
    if(this.vehiculo().tipoVehiculo==="Auto"){
    this.router.navigate([`vehiculos/modificarAuto/${this.vehiculo().id}`])
    }else if(this.vehiculo().tipoVehiculo==="Moto"){
      this.router.navigate([`vehiculos/modificarMoto/${this.vehiculo().id}`])
    }
  }

  verDetalleVehiculo() {
    if (this.vehiculo().tipoVehiculo === 'Auto') {
      this.router.navigate([])
    }
    else if(this.vehiculo().tipoVehiculo==="Moto") {
      this.router.navigate([`vehiculos/detalle/${this.vehiculo().id}`])
    }
  }

  eliminarVehiculo(){
    if(this.vehiculo().tipoVehiculo==="Moto"){
      this.motoService.deleteMoto(this.vehiculo().id).subscribe({
        next:()=>{
          alert("Vehiculo eliminado correctamente")
        },
        error:(err)=>console.log("Error al eliminar el vehiculo ", err)
      })
    }
  }

}
