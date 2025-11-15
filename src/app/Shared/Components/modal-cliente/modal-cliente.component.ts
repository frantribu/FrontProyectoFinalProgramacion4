import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../Core/Services/ClientService/client.service';
import { User } from '../../../Core/Models/User';

@Component({
  selector: 'app-modal-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-cliente.component.html',
  styleUrl: './modal-cliente.component.css'
})

export class ModalClienteComponent {
  fb=inject(FormBuilder)
  service=inject(ClientService)
  
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
      isLogged: false
    }
    
    this.service.postClient(cliente).subscribe({
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

}
