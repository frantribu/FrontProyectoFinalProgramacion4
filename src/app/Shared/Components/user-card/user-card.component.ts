import { Component, inject, input } from '@angular/core';
import { User } from '../../../Core/Models/User';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../Core/Services/User/UserService/user.service';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  standalone: true
})
export class UserCardComponent {
  user = input<User>()
  service = inject(UserServiceService)
  route = inject(Router)

  delete() {
    this.service.deleteUser(this.user()!.id)
  }

  modifyUser(id:string){
    this.route.navigate(["userpage/modify/", id])
  }

  asignRole() {
    let role: string

    if (this.user()?.idRol == 1) {
      role = "ADMIN"
    } else if (this.user()?.idRol == 2) {
      role = "EMPLEADO"
    } else if (this.user()?.idRol == 3) {
      role = "ENCARGADO TALLER"
    } else if(this.user()?.idRol == 4){
      role = "CLIENTE"
    }else{
      role = "error"
    }

    return role
  }

}
