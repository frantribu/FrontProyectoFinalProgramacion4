import { Component, inject, input } from '@angular/core';
import { Taller } from '../../../Core/Models/Taller';
import { Router } from 'express';

@Component({
  selector: 'app-card-taller',
  imports: [],
  templateUrl: './card-taller.html',
  styleUrl: './card-taller.css',
})
export class CardTaller {
  router = inject(Router)
  taller = input<Taller>()

  modificar(id:number){
    this.router.navigate([`modificarTaller/${id}`])
  }
}
