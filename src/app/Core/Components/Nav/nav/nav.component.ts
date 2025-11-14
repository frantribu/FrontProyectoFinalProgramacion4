import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserServiceService } from '../../../Services/UserService/user-service.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  menuOpen=false
  userService=inject(UserServiceService)

  toggleMenu(){
    this.menuOpen=!this.menuOpen
  }

}
