import { Component, inject, input } from '@angular/core';
import { User } from '../../../Core/Models/User';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userService = inject(UserServiceService)
  user = this.userService.obtenerUsuarioEnSesion()
  router = inject(Router)

  asignRole(){
    let role: string
    
    if (this.user.idRol == 1) {
      role = "ADMIN"
    } else if (this.user.idRol == 2) {
      role = "EMPLEADO"
    } else if (this.user.idRol == 3) {
      role = "ENCARGADO TALLER"
    } else if (this.user.idRol == 4) {
      role = "CLIENTE"
    } else {
      role = "error"
    }

    return role
  }

  volver(){
    this.router.navigate([''])
  }
}
