import { Taller } from './../../../Core/Models/Taller';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallerServiceService } from './../../../Core/Services/Taller/TallerService/taller-service.service';
import { Component, effect, inject } from '@angular/core';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-modificar-taller',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-taller.html',
  styleUrl: './modificar-taller.css',
})
export class ModificarTaller {
  fb = inject(FormBuilder)
  router = inject(ActivatedRoute)
  tallerService = inject(TallerServiceService)
  especialidadService = inject(EspecialidadService)

  idtaller = String(this.router.snapshot.paramMap.get("id"))

  especialidades = toSignal(this.especialidadService.getEspecialidades())
  taller = toSignal(this.tallerService.getTallerByID(this.idtaller))

  formulario = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(1)]],
    Encargado: [null, Validators.required],
    direccion: ["", Validators.required],
    especialidad: [null, Validators.required]
  })

  constructor() {
    effect(() => {
      const u = this.taller();
      if (u) {
        this.formulario.patchValue({
         name: u.NombreTaller,
         Encargado: null,
         direccion: u.Direccion,
         especialidad: null
        });
      }
    });
  }

  modificar(){
    this.tallerService.getTallerByID(this.idtaller).subscribe(
      taller => {
        const tallerr:Taller=({
          id:this.idtaller,
          Especialidad:this.formulario.value.especialidad!,
          NombreTaller:this.formulario.value.name!,
          Encargado:this.formulario.value.Encargado!,
          Vehiculos:taller.Vehiculos,
          Direccion:this.formulario.value.direccion!
        })    
        this.tallerService.patchTaller(tallerr)
      })
    
  }
}
