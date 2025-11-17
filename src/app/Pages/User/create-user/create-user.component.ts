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
    contrasenia: ["", [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
  })

  enviar() {
    const user: Partial<User> = ({
      nombre: this.formUser.value.name,
      apellido: this.formUser.value.lastName,
      idRol: this.formUser.value.rol!,
      email: this.formUser.value.email,
      dni: this.formUser.value.dni!,
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

  getError(campo:string){
    const control=this.formUser.get(campo);

    if(!control?.touched || !control || !control.errors) return null

    if(control?.errors['required']) return "Este campo es obligatorio"
    if(campo==="email" && control.errors['pattern']) return "El email debe ser válido y terminar en .com"
    if(control.errors["min"]) return "El DNI debe ser mayor a 10.000.000"
    if(control.errors['max']) return "El DNI debe ser menor a 99.999.999"
    if(campo==="contrasenia" && control.errors['pattern']) return "La contraseña debe tener al menos una Mayuscula, un numero y 8 caracteres"

    return null;
  }
}
