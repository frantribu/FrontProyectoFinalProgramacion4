import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService } from '../../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TypeMotorbikeService } from '../../../../Core/Services/Vehicle/MotorBike/TypeMotorBike/type-motorbike.service';

@Component({
  selector: 'app-detalle-moto',
  imports: [],
  templateUrl: './detalle-moto.component.html',
  styleUrl: './detalle-moto.component.css'
})
export class DetalleMotoComponent {
  activatedRouter = inject(ActivatedRoute)
  motoService = inject(MotoService)
  router = inject(Router)
  typeService=inject(TypeMotorbikeService)

  tipoDeMoto=signal("")

  id = this.activatedRouter.snapshot.paramMap.get("id")

  moto = toSignal(this.motoService.getMotoById(this.id!))

  constructor(){
    effect(()=>{
      const idTipo=this.moto()?.idTipoCarroceria

      if(idTipo){
        this.typeService.getTypeCarroceriaById(idTipo).subscribe({
          next:(n)=>this.tipoDeMoto.set(n.name),
          error:(err)=>console.log("Error al obtener el tipo de moto ", err)
        })
      }
    })
  }

  vender() {
    this.router.navigate([`vender/${this.id}`])
  }

  volver() {
    this.router.navigate(['vehiculos'])
  }
}
