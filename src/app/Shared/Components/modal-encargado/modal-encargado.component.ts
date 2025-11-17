import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-modal-encargado',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-encargado.component.html',
  styleUrl: './modal-encargado.component.css'
})
export class ModalEncargadoComponent {
  fb = inject(FormBuilder)
  service = inject(UserServiceService)

  encargadoCreado = output<User>()
  cerrarModal = output<void>()

  formularioEncargado = this.fb.nonNullable.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)]],
    dni: [0, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    contrasenia:['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
  })

  enviar() {
    const encargado: Partial<User> = {
      nombre: this.formularioEncargado.value.nombre,
      apellido: this.formularioEncargado.value.apellido,
      email: this.formularioEncargado.value.email,
      dni: this.formularioEncargado.value.dni,
      contrasenia:this.formularioEncargado.value.contrasenia,
      idRol: 3,
    }

    this.service.postUser(encargado).subscribe({
      next: (nuevoCliente: User) => {
        this.encargadoCreado.emit(nuevoCliente)
        this.cerrarModal.emit()
      },
      error: (err) => console.log("Error al crear el cliente", err)
    })
  }

  cerrar() {
    this.cerrarModal.emit()
  }

  getError(campo: string) {
    const control = this.formularioEncargado.get(campo)

    if (!control || !control.touched || !control.errors) return null

    if (control.errors['required']) return "El campo es obligatorio"
    if (campo==="email" && control.errors['pattern']) return "El email debe ser válido y terminar en .com"
    if (control.errors["min"]) return "El DNI debe ser mayor a 10.000.000"
    if (control.errors['max']) return "El DNI debe ser menor a 99.999.999"
    if (campo==="contrasenia" && control.errors['pattern']) return "La contraseña debe tener al menos una Mayuscula, un numero y 8 caracteres"

    return null
  }

}
