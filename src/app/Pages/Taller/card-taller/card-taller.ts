import { Component, inject, input } from '@angular/core';
import { Taller } from '../../../Core/Models/Taller';
import { Router } from '@angular/router';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';

@Component({
  selector: 'app-card-taller',
  imports: [],
  templateUrl: './card-taller.html',
  styleUrl: './card-taller.css',
})
export class CardTaller {
  router = inject(Router)
  taller = input<Taller>()
  tallerService = inject(TallerServiceService)
  

  modificar(id:string){
    this.router.navigate(["taller/modificar", id])
  }

  eliminar(){
    this.tallerService.deleteTaller(this.taller()?.id!)
  }
}
