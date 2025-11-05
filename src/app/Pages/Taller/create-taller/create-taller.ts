import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Taller } from '../../../Core/Models/Taller';
@Component({
  selector: 'app-create-taller',
  imports: [ReactiveFormsModule],
  templateUrl: './create-taller.html',
  styleUrl: './create-taller.css',
})

export class CreateTaller {
  fb = inject(FormBuilder)
  tallerService = inject(TallerServiceService)
  especialidadService = inject(EspecialidadService)
  

  especialidades = toSignal(this.especialidadService.getEspecialidades())
  
  formulario = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(1)]],
    encargado: [null, Validators.required],
    direccion: ["",Validators.required],
    especialidad: [null, Validators.required]
  })

  enviar(){
    const taller : Partial<Taller> = {
      NombreTaller: this.formulario.value.name,
      Encargado: this.formulario.value.encargado!,
      Direccion: this.formulario.value.direccion,
      Especialidad: this.formulario.value.especialidad!
    }
    this.tallerService.putTaller(taller)
  }
}
