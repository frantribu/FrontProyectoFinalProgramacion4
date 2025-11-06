import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/User/UserService/user.service';
import { RolesService } from '../../../Core/Services/User/RolService/roles.service';
import { User } from '../../../Core/Models/User';

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
        });
      }
    });
  }


  formModifyUser = this.formBuilder.nonNullable.group({
    name: [this.user()?.nombre, Validators.required],
    lastName: [this.user()?.apellido, Validators.required],
    rol: [this.user()?.idRol, Validators.required],
    email: [this.user()?.email, [Validators.required, Validators.email]],
    dni: [this.user()?.dni, [Validators.required, Validators.min(10000000),  Validators.max(99999999)]]
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
        contrasenia: user.contrasenia
      })
      this.service.patchUser(this.userId, userr)
    })


  }



}
