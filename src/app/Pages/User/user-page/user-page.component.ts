import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserCardComponent } from '../../../Shared/Components/user-card/user-card.component';
import { UserServiceService } from '../../../Core/Services/User/UserService/user.service';


@Component({
  selector: 'app-user-page',
  imports: [UserCardComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
  standalone: true
})

export class UserPageComponent {
  service = inject(UserServiceService)
  users = toSignal(this.service.getUsers(), { initialValue: [] })


}
