import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService } from '../../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';
import { toSignal } from '@angular/core/rxjs-interop';

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

  id = this.activatedRouter.snapshot.paramMap.get("id")

  moto = toSignal(this.motoService.getMotoById(this.id!))

  vender() {
    this.router.navigate([`vender/${this.id}`])
  }

  volver() {
    this.router.navigate(['vehiculos'])
  }
}
