import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { RolesService } from '../RolService/roles.service';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  http = inject(HttpClient)
  private url = "http://localhost:3000/usuarios"
  route = inject(Router)
  serviceRol = inject(RolesService)

  getUsers() {
    return this.http.get<User[]>(this.url)
  }

  getUserByEmail(email: string) {
    return this.http.get<User[]>(`${this.url}?email=${email}`)
  }

  getUserById(id: string) {
    return this.http.get<User>(`${this.url}/${id}`)
  }

  getUserByRole(idRole: number) {
    return this.getUsers().pipe(
      map((users: User[]) => {
        return users.filter(user => user.idRol == idRole)
      })
    )
  }

  updateIsLogged(user: User) {
    this.http.put<User>(`${this.url}/${user.id}`, user).subscribe({
      next: () => console.log("Estado modificado con exito"),
      error: (err) => console.log("Error al actualizar el estado: ", err)
    })
  }

  postUser(user: Partial<User>) {
    return this.http.post<User>(this.url, user)
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
    localStorage.removeItem("usuarioLogueado");
    this.route.navigate(['login'])
  }

  getClientes() {
    return this.serviceRol.getIdByRol("CLIENTE").pipe(
      switchMap(objetoRol => {
        return this.http.get<User[]>(`${this.url}?idRol=${objetoRol!.id}`);
      }));
  }

  getEncargados() {
    return this.serviceRol.getIdByRol("ENCARGADO TALLER").pipe(
      switchMap(objetoRol => {
        return this.http.get<User[]>(`${this.url}?idRol=${objetoRol!.id}`);
      }));
  }
}
