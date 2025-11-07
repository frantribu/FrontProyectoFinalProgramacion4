import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  http = inject(HttpClient)
  private url = "http://localhost:3000/usuarios"
  route = inject(Router)

  getUsers() {
    return this.http.get<User[]>(this.url)
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(`${this.url}?email=${email}`)
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.url}/${id}`)
  }

  updateIsLogged(user: User) {
    user.isLogged = !user.isLogged

    this.http.put<User>(`${this.url}/${user.id}`, user).subscribe({
      next: () => console.log("Estado modificado con exito"),
      error: (err) => console.log("Error al actualizar el estado: ", err)
    })
  }

  postUser(user: Partial<User>) {
    return this.http.post(this.url, user)
  }

  patchUser(id: string, user: Partial<User>) {
    return this.http.patch(`${this.url}/${id}`, user)
  }

  deleteUser(id: string) {
    return this.http.delete<User>(`${this.url}/${id}`)
  }

  guardarUsuarioEnSesion(user: User) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(user))
  }

  obtenerUsuarioEnSesion() {
    const data = localStorage.getItem("usuarioLogueado")

    return data ? JSON.parse(data) : null
  }

  cerrarSesion() {
    localStorage.removeItem("usuarioLogueado")
  }
}
