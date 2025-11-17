import { Component, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from "@angular/router";
import { CardTaller } from '../../../Shared/Components/card-taller/card-taller';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
@Component({
  selector: 'app-list-taller',
  imports: [CardTaller],
  templateUrl: './list-taller.html',
  styleUrl: './list-taller.css',
})
export class ListTaller {
  serviceTaller = inject(TallerServiceService)
  router = inject(Router)

  talleres = toSignal(this.serviceTaller.getTalleres(), {initialValue: []})

  detalle(id:string){
    this.router.navigate([`taller/detalle/${id}`])
  }
<<<<<<< HEAD
=======

  volver(){
    this.router.navigate([''])
  }
>>>>>>> 96e9a2fa32997a27e247674e8ea64fd75782b2b8
}
