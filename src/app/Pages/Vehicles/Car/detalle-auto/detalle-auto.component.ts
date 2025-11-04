import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoService } from '../../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-detalle-auto',
  imports: [],
  templateUrl: './detalle-auto.component.html',
  styleUrl: './detalle-auto.component.css'
})
export class DetalleAutoComponent {
  router = inject(ActivatedRoute);
  autoService = inject(AutoService)

  //id = this.router.snapshot.paramMap.get('id')
  id = "4aae";

  auto = toSignal(this.autoService.getAutoById(this.id!))

  mostrar(){
    console.log(this.auto()?.kilometros);
  }
}
