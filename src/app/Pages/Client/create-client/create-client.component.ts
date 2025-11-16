import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../Core/Models/User';
import { ClientService } from '../../../Core/Services/ClientService/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-client',
  imports: [ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent {
  fb = inject(FormBuilder)
  service = inject(ClientService)
  router = inject(Router)

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
    
    this.service.postClient(cliente).subscribe({
      next: () => { 
        console.log("Cliente creado con exito") 
        this.router.navigate(["clientes"])
      },
      error: (err) => console.log("Error al crear el cliente", err)

    })
  }

  volver(){
    this.router.navigate(["home"])
  }
}
