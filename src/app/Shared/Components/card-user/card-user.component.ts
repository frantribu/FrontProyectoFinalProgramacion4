import { Component, inject, input } from '@angular/core';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-user',
  imports: [],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  user = input<User>()
  service = inject(UserServiceService)
  route = inject(Router)

  delete() {
    const resultado = confirm("¿Estás seguro que querés eliminar este usuario?")

    if (!resultado) {
      console.log("Cancelado")
    } else {
      this.service.deleteUser(this.user()!.id).subscribe({
        next: () => console.log("Eliminado con exito"),
        error: (err) => console.log("Error al eliminar el usuario", err)
      })
    }
  }

  modifyUser() {
    this.route.navigate(["usuarios/modificar/", this.user()?.id])
  }

  asignRole() {
    let role: string

    if (this.user()?.idRol == 1) {
      role = "ADMIN"
    } else if (this.user()?.idRol == 2) {
      role = "EMPLEADO"
    } else if (this.user()?.idRol == 3) {
      role = "ENCARGADO TALLER"
    } else if (this.user()?.idRol == 4) {
      role = "CLIENTE"
    } else {
      role = "error"
    }

    return role
  }
}
