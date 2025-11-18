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
  taller = input.required<Taller>()
  especialidad = signal("")
  especialidadService = inject(EspecialidadService)

  constructor() {
    effect(() => {
      const id = this.taller()?.Especialidad
      if (id) {
        this.especialidadService.getEspecialidadByID(id).subscribe({
          next: (e) => this.especialidad.set(e.name)
        })
      }
    })
  }

 
}
