import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-detalle-user',
  imports: [],
  templateUrl: './detalle-user.component.html',
  styleUrl: './detalle-user.component.css'
})
export class DetalleUserComponent {
  userService = inject(UserServiceService)
  activatedRouter = inject(ActivatedRoute)
  router = inject(Router)

  id = this.activatedRouter.snapshot.paramMap.get("id")

  user=toSignal(this.userService.getUserById(this.id!))

  asignRole() {

    let role: string
    
    if (this.user()?.idRol == "1") {
      role = "ADMIN"
    } else if (this.user()?.idRol == "2") {
      role = "EMPLEADO"
    } else if (this.user()?.idRol == "3") {
      role = "ENCARGADO TALLER"
    } else if (this.user()?.idRol == "4") {
      role = "CLIENTE"
    } else {
      role = "error"
    }

    return role
  }

  volver(){
    this.router.navigate(["usuarios"])
  }
}
