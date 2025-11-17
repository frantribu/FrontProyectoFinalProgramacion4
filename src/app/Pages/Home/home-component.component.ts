import { Component, inject } from '@angular/core';
import { CardHomeComponent } from '../../Shared/Components/card-home/card-home/card-home.component';
import { UserServiceService } from '../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-home-component',
  imports: [CardHomeComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  userService=inject(UserServiceService)

  user=this.userService.obtenerUsuarioEnSesion()
}
