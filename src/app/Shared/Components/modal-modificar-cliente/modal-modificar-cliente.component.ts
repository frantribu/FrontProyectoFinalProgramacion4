import { Component, effect, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../Core/Models/User';

@Component({
  selector: 'app-modal-modificar-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-modificar-cliente.component.html',
  styleUrl: './modal-modificar-cliente.component.css'
})
export class ModalModificarClienteComponent {
  fb = inject(FormBuilder)
  service = inject(UserServiceService)
  router = inject(ActivatedRoute)

  idClient = this.router.snapshot.paramMap.get("id")
  client = toSignal(this.service.getUserById(this.idClient!))

  clienteModificado = output<User>()
  cerrarMenu = output<void>()

    constructor() {
    effect(() => {
      const u = this.client();
      if (u) {
        this.formClient.patchValue({
          nombre: u.nombre,
          apellido: u.apellido,
          email: u.email,
          dni: u.dni,
        });
      }
    });
  }

  formClient = this.fb.nonNullable.group({
    nombre: [this.client()?.nombre, Validators.required],
    apellido: [this.client()?.apellido, Validators.required],
    email: [this.client()?.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)],
    dni: [this.client()?.dni, Validators.required, Validators.min(10000000), Validators.max(99999999)]
  })

  modificar() {
    const cliente: Partial<User> = {
      nombre: this.formClient.value.nombre,
      apellido: this.formClient.value.apellido,
      email: this.formClient.value.email,
      dni: this.formClient.value.dni
    }

    this.service.patchUser(this.idClient!, cliente).subscribe({
      next: (c: User) => {
        this.clienteModificado.emit(c)
        this.cerrarMenu.emit()
      },
      error: () => console.log("No se pudo modificar el cliente")
    })
  }

  cerrar(){
    this.cerrarMenu.emit()
  }


  getError(campo: string) {
    const control = this.formClient.get(campo)

    if (!control || !control.touched || !control.errors) return null

    if (control.errors['required']) return "El campo es obligatorio"
    if (control.errors['pattern']) return "El email debe ser válido y terminar en .com"
    if (control.errors["min"]) return "El DNI debe ser mayor a 10.000.000"
    if (control.errors['max']) return "El DNI debe ser menor a 99.999.999"

    return null
  }
}
