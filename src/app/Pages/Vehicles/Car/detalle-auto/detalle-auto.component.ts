import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoService } from '../../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CombustionService } from '../../../../Core/Services/Vehicle/Combustion/combustion.service';
import { TypeCarService } from '../../../../Core/Services/Vehicle/Car/TypeCar/type-car.service';

@Component({
  selector: 'app-detalle-auto',
  imports: [],
  templateUrl: './detalle-auto.component.html',
  styleUrl: './detalle-auto.component.css'
})
export class DetalleAutoComponent {
  activatedRouter = inject(ActivatedRoute);
  autoService = inject(AutoService)
  combustionService = inject(CombustionService)
  router=inject(Router)
  typeCar=inject(TypeCarService)

  tipoDeAuto=signal("")

  id = this.activatedRouter.snapshot.paramMap.get('id')

  auto = toSignal(this.autoService.getAutoById(this.id!))

  constructor(){
    effect(()=>{
      const idTipo=this.auto()?.idTipoCarroceria

      if(idTipo){
        this.typeCar.getTypeCarById(idTipo).subscribe({
          next:(n)=>this.tipoDeAuto.set(n.name),
          error:(err)=>console.log("Error al obtener el tipo de auto", err)
        })
      }
    })
  }

  mostrar() {
    console.log(this.auto()?.rutasImagen);
  }

  vender(){
    this.router.navigate([`vender/${this.id}`])
  }

  volver(){
    this.router.navigate(['vehiculos'])
  }
}
