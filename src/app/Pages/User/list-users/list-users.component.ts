import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardUserComponent } from '../../../Shared/Components/card-user/card-user.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  imports: [CardUserComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  router=inject(Router)
  service = inject(UserServiceService)
  users = toSignal(this.service.getUsers(), { initialValue: [] })

  volver(){
   this.router.navigate(["home"])
  }
}
