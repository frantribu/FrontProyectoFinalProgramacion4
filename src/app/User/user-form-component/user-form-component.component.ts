import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Core/Services/user-service.service';

@Component({
  selector: 'app-user-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.css'
})
export class UserFormComponentComponent {
  
  formBuilder = inject(FormBuilder)

  formUser = this.formBuilder.nonNullable.group({
    name: ["", Validators.required],
    lastName: ["", Validators.required],
    rol: [Validators.required],
    email: ["", [Validators.required], [Validators.email]],
    dni: [12345678, [Validators.required], [Validators.minLength(8)]]
  })

  enviar(){
    let user: Partial<User>=({
      nombre: this.formUser.value.name,
      apellido: this.formUser.value.lastName,
      idRol: this.formUser.value.rol,
      email: this.formUser.value.email,
      dni: this.formUser.value.dni
    })
  }

}
