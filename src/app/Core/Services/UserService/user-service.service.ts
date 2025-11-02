import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  http=inject(HttpClient)
  
  getUserByEmail(email:string){
    return this.http.get<User[]>(`http://localhost:3000/Usuario?email=${email}`)
  }

  updateIsLogged(user:User){
    user.isLogged=true

    this.http.put<User>(`http://localhost:3000/Usuario/${user.id}`, user).subscribe({
      next: ()=>console.log("Estado modificado con exito"),
      error: (err)=>console.log("Error al actualizar el estado: ", err)
    })
  }
}
