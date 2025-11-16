import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Taller } from '../../../Core/Models/Taller';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
import { Router } from '@angular/router';

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
  userService = inject(UserServiceService)
  router = inject(Router)
  

  especialidades = toSignal(this.especialidadService.getEspecialidades(),{initialValue : []})
  encargados = toSignal(this.userService.getUserByRole(3),{initialValue : []})
  
  
  formulario = this.fb.nonNullable.group({
    name: ["", [Validators.required]],
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

    this.tallerService.postTaller(taller).subscribe(
      {
        next : () => this.router.navigate([`taller/listar`])
      }
    )
  }
}
