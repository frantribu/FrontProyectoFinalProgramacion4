import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../Services/UserService/user-service.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  userService=inject(UserServiceService)

  user=this.userService.obtenerUsuarioEnSesion()
}
