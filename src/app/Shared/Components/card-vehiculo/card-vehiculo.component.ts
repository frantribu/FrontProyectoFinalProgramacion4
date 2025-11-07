import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { VehiculoPolimorfico } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { MotoService } from '../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';
import { AutoService } from '../../../Core/Services/Vehicle/Car/CarService/auto.service';

@Component({
  selector: 'app-card-vehiculo',
  imports: [],
  templateUrl: './card-vehiculo.component.html',
  styleUrl: './card-vehiculo.component.css'
})
export class CardVehiculoComponent {
  vehiculo = input.required<VehiculoPolimorfico>()
  router = inject(Router)
  motoService = inject(MotoService)
  autoService = inject(AutoService)
  vehiculoEliminado = output<string>()

  modificar() {
    if (this.vehiculo().tipoVehiculo === "Auto") {
      this.router.navigate([`vehiculos/modificarAuto/${this.vehiculo().id}`])
    } else if (this.vehiculo().tipoVehiculo === "Moto") {
      this.router.navigate([`vehiculos/modificarMoto/${this.vehiculo().id}`])
    }
  }

  verDetalleVehiculo() {
    if (this.vehiculo().tipoVehiculo === 'Auto') {
      this.router.navigate([`vehiculos/detalleAuto/${this.vehiculo().id}`])
    }
    else if (this.vehiculo().tipoVehiculo === "Moto") {
      this.router.navigate([`vehiculos/detalleMoto/${this.vehiculo().id}`])
    }
  }

  eliminarVehiculo() {
    const resultado = confirm('¿Estás seguro que querés eliminar este vehiculo?');

    if (!resultado) {
      console.log("Cancelado")
    } else {
      if (this.vehiculo().tipoVehiculo === "Moto") {
        this.motoService.deleteMoto(this.vehiculo().id).subscribe({
          next: () => {
            console.log("Vehiculo eliminado con exito")
          },
          error: (err) => console.log("Error al eliminar el vehiculo ", err)
        })
      } else if (this.vehiculo().tipoVehiculo === "Auto") {
        this.autoService.deleteAuto(this.vehiculo().id).subscribe({
          next: () => {
          },
          error: (err) => console.log("Error al eliminar el vehiculo ", err)
        })
      }
    }
  }

}
