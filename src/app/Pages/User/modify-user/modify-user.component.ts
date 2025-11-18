import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../../../Core/Models/User';
import { RolesService } from '../../../Core/Services/RolService/roles.service';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { dniExistsValidator, emailExistsValidator } from '../../../Core/Validators/UserValidator';

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
    email: [this.user()?.email, {
            validators: [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z]{3,}\.com$/)],
            asyncValidators: [emailExistsValidator(this.service, this.userId)],
            updateOn: 'blur'
          }],
    dni: [this.user()?.dni, {
            validators: [Validators.required, Validators.min(10000000), Validators.max(99999999)],
            asyncValidators: [dniExistsValidator(this.service, this.userId)],
            updateOn: 'blur'
          }],
    contrasenia: [this.user()?.contrasenia, [ Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)]]
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

  getError(campo:string){
    const control=this.formModifyUser.get(campo);

    if(!control?.touched || !control || !control.errors) return null

    if(control?.errors['required']) return "Este campo es obligatorio"
    if(campo==="email" && control.errors['pattern']) return "El email debe ser válido y terminar en .com"
    if(control.errors["min"]) return "El DNI debe ser mayor a 10.000.000"
    if(control.errors['max']) return "El DNI debe ser menor a 99.999.999"
    if(campo==="contrasenia" && control.errors['pattern']) return "La contraseña debe tener al menos una Mayuscula, un numero y 8 caracteres"

    return null;
  }

}