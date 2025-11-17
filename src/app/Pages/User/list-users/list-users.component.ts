import { Component, inject, signal } from '@angular/core';
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
  router = inject(Router)
  service = inject(UserServiceService)
  users = signal<any[]>([])

  volver() {
    this.router.navigate([''])
  }

  constructor() {
    this.cargarUsuarios()
  }


  cargarUsuarios(): void {
    this.service.getUsers().subscribe({
      next: (data) => {
        // Actualiza la Signal con el método .set()
        this.users.set(data);
      },
      error: (err) => {
        console.error("Error al cargar usuarios:", err);
      }
    });
  }

  eliminarUsuarioLista() {
    this.cargarUsuarios()
  }
}
