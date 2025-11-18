import { Taller } from './../../../Core/Models/Taller';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TallerServiceService } from './../../../Core/Services/Taller/TallerService/taller-service.service';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { ModalEncargadoComponent } from '../../../Shared/Components/modal-encargado/modal-encargado.component';

@Component({
  selector: 'app-modificar-taller',
  imports: [ReactiveFormsModule, ModalEncargadoComponent],
  templateUrl: './modificar-taller.html',
  styleUrl: './modificar-taller.css',
})
export class ModificarTaller {
  fb = inject(FormBuilder)
  activated = inject(ActivatedRoute)
  tallerService = inject(TallerServiceService)
  especialidadService = inject(EspecialidadService)
  router = inject(Router)
  userService = inject(UserServiceService)

  idtaller = String(this.activated.snapshot.paramMap.get("id"))

  especialidades = toSignal(this.especialidadService.getEspecialidades())
  taller = toSignal(this.tallerService.getTallerByID(this.idtaller))

  menuAbiertoEncargado = false
  busquedaEncargado = signal("")

  mostrarMenuModal = signal(false)

  encargados = signal<User[]>([])

  encargadosFiltrados = computed(() => {
    const filtro = this.busquedaEncargado().toLowerCase()

    return this.encargados().filter(c => `${c.nombre} ${c.apellido} ${c.dni}`.toLowerCase().includes(filtro))
  })

  formulario = this.fb.nonNullable.group({
    name: ["", [Validators.required, Validators.minLength(1)]],
    Encargado: ["", Validators.required],
    direccion: ["", Validators.required],
    especialidad: ["", Validators.required]
  })

  constructor() {
    this.cargarEncargados()

    effect(() => {
      const u = this.taller();
      if (u) {
        this.formulario.patchValue({
          name: u.NombreTaller,
          Encargado: u.Encargado,
          direccion: u.Direccion,
          especialidad: u.Especialidad
        });
      }

      this.busquedaEncargado.set(this.obtenerNombreEncargado(u?.Encargado!)!)
    });
  }

  cargarEncargados() {
    this.userService.getEncargados().subscribe({
      next: (encarg) => this.encargados.set(encarg)
    })
  }


  obtenerNombreEncargado(id: string) {
    const encargado = this.encargados().find(e => e.id === id)

    if (encargado) {
      return `${encargado.nombre} ${encargado.apellido} | ${encargado.dni}`
    }

    return null

  }

  modificar() {
    this.tallerService.getTallerByID(this.idtaller).subscribe(
      taller => {
        const tallerr: Taller = ({
          id: this.idtaller,
          Especialidad: this.formulario.value.especialidad!,
          NombreTaller: this.formulario.value.name!,
          Encargado: this.formulario.value.Encargado!,
          Vehiculos: taller.Vehiculos,
          Direccion: this.formulario.value.direccion!
        })
        this.tallerService.patchTaller(tallerr).subscribe({
          next: () => this.router.navigate(['taller'])
        })
      })
  }

  volver() {
    this.router.navigate([`taller/detalle/${this.idtaller}`])
  }

  toggleMenu() {
    this.menuAbiertoEncargado = !this.menuAbiertoEncargado
  }

  seleccionarEncargado(encargado: User) {
    this.formulario.get("Encargado")?.setValue(encargado.id)
    this.busquedaEncargado.set(`${encargado.nombre} ${encargado.apellido} | ${encargado.dni}`)
  }


  abrirModalEncargado() {
    this.mostrarMenuModal.set(true)
  }

  cerrarModalEncargado() {
    this.mostrarMenuModal.set(false)
  }

  agregarEncargadoALista(encargado: User) {
    const encargadosActuales = this.encargados()

    this.encargados.set([...encargadosActuales, encargado])
    this.seleccionarEncargado(encargado)
  }
}