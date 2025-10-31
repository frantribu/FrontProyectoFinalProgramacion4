import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface User {
  id: string,
  dni: number,
  nombre: string,
  apellido: string,
  idRol: number,
  email: string,
  contrasenia: string,
  isLogged: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  http = inject(HttpClient)
  url = "http://localhost:3000/Usuario"

  postUser(){
    this.http
  }


}
