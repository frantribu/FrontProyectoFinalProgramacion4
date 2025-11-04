import { Component, inject } from '@angular/core';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";
@Component({
  selector: 'app-list-taller',
  imports: [],
  templateUrl: './list-taller.html',
  styleUrl: './list-taller.css',
})
export class ListTaller {
  serviceTaller = inject(TallerServiceService)
  router = inject(Router)

  talleres = toSignal(this.serviceTaller.getTalleres())
  
  modificar(){
    this.router.navigate
  }
}
