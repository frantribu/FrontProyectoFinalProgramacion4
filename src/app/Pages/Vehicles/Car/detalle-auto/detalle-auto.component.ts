import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoService } from '../../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CombustionService } from '../../../../Core/Services/Vehicle/Combustion/combustion.service';

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

  id = this.activatedRouter.snapshot.paramMap.get('id')

  auto = toSignal(this.autoService.getAutoById(this.id!))

  mostrar() {
    console.log(this.auto()?.rutasImagen);
  }
}
