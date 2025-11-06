import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../Core/Models/User';
import { toSignal } from '@angular/core/rxjs-interop';
import { RolesService } from '../../../Core/Services/User/RolService/roles.service';
import { UserServiceService } from '../../../Core/Services/User/UserService/user.service';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css',
  standalone: true
})
export class UserFormComponentComponent {
  service = inject(UserServiceService)
  serviceRol = inject(RolesService)
  formBuilder = inject(FormBuilder)
  roles = toSignal(this.serviceRol.getRoles())

  formUser = this.formBuilder.nonNullable.group({
    name: ["", Validators.required],
    lastName: ["", Validators.required],
    rol: [null, Validators.required],
    email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@miempresa\.com$")]],
    dni: [0, [Validators.required, Validators.min(10000000),  Validators.max(99999999)]]
  })

  enviar(){
    const user: Partial<User>=({
      nombre: this.formUser.value.name,
      apellido: this.formUser.value.lastName,
      idRol: this.formUser.value.rol!,
      email: this.formUser.value.email,
      dni: this.formUser.value.dni,
      isLogged: false
    })

    this.service.postUser(user)
  }

}
