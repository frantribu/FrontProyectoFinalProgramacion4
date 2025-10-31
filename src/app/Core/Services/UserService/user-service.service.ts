import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  http=inject(HttpClient)
  
  getUserByEmail(email:String){
    return this.http.get<User[]>(`http://localhost:3000/Usuario?email=${email}`)
  }
}
