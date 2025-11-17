<<<<<<< HEAD
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
=======
>>>>>>> 96e9a2fa32997a27e247674e8ea64fd75782b2b8
import { Component, effect, inject, input, signal } from '@angular/core';
import { Taller } from '../../../Core/Models/Taller';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';

@Component({
  selector: 'app-card-taller',
  imports: [],
  templateUrl: './card-taller.html',
  styleUrl: './card-taller.css',
})
export class CardTaller {
<<<<<<< HEAD
  especialidadService = inject(EspecialidadService)
  taller = input<Taller>()
  especialidad = signal("") 

  constructor(){
    effect(() =>{
      const id = this.taller()?.Especialidad
      if(id){
=======
  taller = input.required<Taller>()
  especialidad = signal("")
  especialidadService = inject(EspecialidadService)

  constructor() {
    effect(() => {
      const id = this.taller()?.Especialidad
      if (id) {
>>>>>>> 96e9a2fa32997a27e247674e8ea64fd75782b2b8
        this.especialidadService.getEspecialidadByID(id).subscribe({
          next: (e) => this.especialidad.set(e.name)
        })
      }
    })
  }
<<<<<<< HEAD
=======

 
>>>>>>> 96e9a2fa32997a27e247674e8ea64fd75782b2b8
}
