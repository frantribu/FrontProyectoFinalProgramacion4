import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Taller } from '../../../Core/Models/Taller';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
import { ModalEncargadoComponent } from '../../../Shared/Components/modal-encargado/modal-encargado.component';
import { User } from '../../../Core/Models/User';
import { Router } from 'express';

@Component({
  selector: 'app-create-taller',
  imports: [ReactiveFormsModule, ModalEncargadoComponent],
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
  encargados = signal<User[]>([])
  
  constructor(){
    this.cargarEncargados()
  }

  cargarEncargados(){
    this.userService.getEncargados().subscribe({
      next:(encarg)=>this.encargados.set(encarg)
    })
  }

  busquedaEncargado=signal("")

  menuAbiertoEncargado=false
  mostrarMenuModal=signal(false)

  encargadosFiltrados=computed(()=>{
    const filtro=this.busquedaEncargado().toLowerCase()

    return this.encargados().filter(e=>`${e.nombre} ${e.apellido} ${e.dni}`.toLowerCase().includes(filtro))
  })

  formulario = this.fb.nonNullable.group({
    name: ["", [Validators.required]],
    encargado: ['', Validators.required],
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
<<<<<<< HEAD
        next : () => this.router.navigate([`taller/listar`])
=======
        next : () => this.router.navigate(['taller'])
>>>>>>> 96e9a2fa32997a27e247674e8ea64fd75782b2b8
      }
    )
  }

  toggleMenu(){
    this.menuAbiertoEncargado=!this.menuAbiertoEncargado
  }

  abrirModalEncargado(){
    this.mostrarMenuModal.set(true)
  }

  cerrarModalEncargado(){
    this.mostrarMenuModal.set(false)
  }

  seleccionarEncargado(encargado:User){
    this.formulario.get("encargado")?.setValue(encargado.id)
    this.busquedaEncargado.set(`${encargado.nombre} ${encargado.apellido} | ${encargado.dni}`)
  }

  agregarEncargadoALista(encargado:User){
    const encargadosActuales=this.encargados()

    this.encargados.set([...encargadosActuales, encargado])
    this.seleccionarEncargado(encargado)
  }

  volver(){
    this.router.navigate([''])
  }
}
