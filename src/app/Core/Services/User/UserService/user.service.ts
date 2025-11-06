import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  http = inject(HttpClient)
  private url = "http://localhost:3000/Usuario"
  route = inject(Router)

  getUsers(){
    return this.http.get<User[]>(this.url)
  }

  postUser(user: Partial<User>){
    this.http.post(this.url, user).subscribe({
      next: () => console.log("Creado con exito"),
      error: (err) => console.log("Error al crear el usuario", err)
      
    })
  }

  getUserById(id:string){
    return this.http.get<User>(`http://localhost:3000/Usuario/${id}`)
  }

  patchUser(id:string, user: Partial<User>){
    return this.http.patch(`http://localhost:3000/Usuario/${id}`, user).subscribe({
      next: () => console.log("Modificado con exito"),
      error: (err) => console.log("Error al modificar el usuario", err)
    })
  }

  deleteUser(id: string){
    return this.http.delete<User>(`http://localhost:3000/Usuario/${id}`).subscribe({
      next: () => console.log("Eliminado con exito"),
      error: (err) => console.log("Error al eliminar el usuario", err)
    })
  }


}
