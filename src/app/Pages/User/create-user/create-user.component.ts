import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { RolesService } from '../../../Core/Services/RolService/roles.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../Core/Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  service = inject(UserServiceService)
  serviceRol = inject(RolesService)
  formBuilder = inject(FormBuilder)
  roles = toSignal(this.serviceRol.getRoles())
  router = inject(Router)

  formUser = this.formBuilder.nonNullable.group({
    name: ["", Validators.required],
    lastName: ["", Validators.required],
    rol: [null, Validators.required],
    email: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)]],
    dni: [null, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    contrasenia: ["", [Validators.required, Validators.minLength(6)]]
  })

  enviar() {
    const user: Partial<User> = ({
      nombre: this.formUser.value.name,
      apellido: this.formUser.value.lastName,
      idRol: this.formUser.value.rol!,
      email: this.formUser.value.email,
      dni: this.formUser.value.dni!,
      isLogged: false,
      contrasenia: this.formUser.value.contrasenia
    })

    this.service.postUser(user).subscribe({
      next: () => { 
        alert("Creado con exito") 
        this.router.navigate(["usuarios"])
      },
      error: (err) => console.log("Error al crear el usuario", err)

    })
  }

  volver(){
    this.router.navigate([''])
  }

}
