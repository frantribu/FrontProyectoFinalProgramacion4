import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../Core/Services/ClientService/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../Core/Models/User';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-modify-client',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-client.component.html',
  styleUrl: './modify-client.component.css'
})
export class ModifyClientComponent {
  fb = inject(FormBuilder)
  service = inject(ClientService)
  userService = inject(UserServiceService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  clientId = String(this.route.snapshot.paramMap.get("id"))
  client = toSignal(this.userService.getUserById(this.clientId))

  formularioClient = this.fb.nonNullable.group({
    nombre: [this.client()?.nombre, Validators.required],
    apellido: [this.client()?.apellido, Validators.required],
    email: [this.client()?.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)]],
    dni: [this.client()?.dni, [Validators.required, Validators.min(10000000), Validators.max(99999999)]]
  })

  constructor() {
    effect(() => {
      const c = this.client();
      if (c) {
        this.formularioClient.patchValue({
          nombre: c.nombre,
          apellido: c.apellido,
          email: c.email,
          dni: c.dni,
        });
      }
    });
  }

  modificar() {
    const cliente: Partial<User> = {
      nombre: this.formularioClient.value.nombre,
      apellido: this.formularioClient.value.apellido,
      email: this.formularioClient.value.email,
      dni: this.formularioClient.value.dni,
      idRol: 4,
    }
    
    this.service.patchClient(this.clientId, cliente).subscribe({
      next: () => { 
        console.log("Cliente modificado con exito") 
        this.router.navigate(["clientes"])
      },
      error: (err) => console.log("Error al modificar el cliente", err)

    })
  }

  volver(){
    this.router.navigate(["clientes"])
  }
}
