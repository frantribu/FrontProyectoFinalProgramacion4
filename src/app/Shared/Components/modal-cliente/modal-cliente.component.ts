import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-modal-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css'
})

export class ModalClienteComponent {
  fb=inject(FormBuilder)
  service=inject(UserServiceService)

  clienteCreado=output<User>()
  cerrarModal=output<void>()

  formularioClient = this.fb.nonNullable.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)]],
    dni: [0, [Validators.required, Validators.min(10000000), Validators.max(99999999)]]
  })

  enviar() {
    const cliente: Partial<User> = {
      nombre: this.formularioClient.value.nombre,
      apellido: this.formularioClient.value.apellido,
      email: this.formularioClient.value.email,
      dni: this.formularioClient.value.dni,
      idRol: 4,
    }
    
    this.service.postUser(cliente).subscribe({
      next: (nuevoCliente:User) => { 
        this.clienteCreado.emit(nuevoCliente)
        this.cerrarModal.emit()
      },
      error: (err) => console.log("Error al crear el cliente", err)

    })
  }

  cerrar(){
    this.cerrarModal.emit()
  }

  getError(campo:string){
    const control=this.formularioClient.get(campo)

    if(!control || !control.touched || !control.errors) return null

    if(control.errors['required']) return "El campo es obligatorio"
    if(control.errors['pattern']) return "El email debe ser válido y terminar en .com"
    if(control.errors["min"]) return "El DNI debe ser mayor a 10.000.000"
    if(control.errors['max']) return "El DNI debe ser menor a 99.999.999"

    return null
  }

}
