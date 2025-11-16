import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../Core/Models/User';
import { RolesService } from '../../../Core/Services/RolService/roles.service';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-modify-user',
  imports: [ReactiveFormsModule],
  templateUrl: './modify-user.component.html',
  styleUrl: './modify-user.component.css',
  standalone: true
})
export class ModifyUserComponent {
  formBuilder = inject(FormBuilder)

  service = inject(UserServiceService)
  route = inject(ActivatedRoute)

  userId = String(this.route.snapshot.paramMap.get("id"))
  user = toSignal(this.service.getUserById(this.userId))

  serviceRol = inject(RolesService)
  roles = toSignal(this.serviceRol.getRoles())

  router=inject(Router)
  
  constructor() {
    effect(() => {
      const u = this.user();
      if (u) {
        this.formModifyUser.patchValue({
          name: u.nombre,
          lastName: u.apellido,
          rol: u.idRol,
          email: u.email,
          dni: u.dni,
          contrasenia: u.contrasenia
        });
      }
    });
  }


  formModifyUser = this.formBuilder.nonNullable.group({
    name: [this.user()?.nombre, Validators.required],
    lastName: [this.user()?.apellido, Validators.required],
    rol: [this.user()?.idRol, Validators.required],
    email: [this.user()?.email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)]],
    dni: [this.user()?.dni, [Validators.required, Validators.min(10000000), Validators.max(99999999)]],
    contrasenia: [this.user()?.contrasenia, [Validators.required,Validators.minLength(7)]]
  })

  modify() {
    this.service.getUserById(this.userId).subscribe(user => {
      const userr: User = ({
        id: this.userId,
        nombre: this.formModifyUser.value.name!,
        apellido: this.formModifyUser.value.lastName!,
        idRol: this.formModifyUser.value.rol!,
        email: this.formModifyUser.value.email!,
        dni: this.formModifyUser.value.dni!,
        isLogged: user.isLogged,
        contrasenia: this.formModifyUser.value.contrasenia!
      })

      this.service.patchUser(this.userId, userr).subscribe({
        next: () => {
          alert("Modificado con exito")
          this.router.navigate(["usuarios"])
        },
        error: (err) => console.log("Error al modificar el usuario", err)
      })
    })
  }

  volver(){
     this.router.navigate(["usuarios"]) 
  }
}