import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../Services/UserService/user-service.service';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userService=inject(UserServiceService)

  user=this.userService.obtenerUsuarioEnSesion()

  a(){
    console.log(this.user)
  }
}
