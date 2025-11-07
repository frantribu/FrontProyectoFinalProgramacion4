import { Component, inject } from '@angular/core';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardUserComponent } from '../../../Shared/Components/card-user/card-user.component';

@Component({
  selector: 'app-list-users',
  imports: [CardUserComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  service = inject(UserServiceService)
  users = toSignal(this.service.getUsers(), { initialValue: [] })

}
