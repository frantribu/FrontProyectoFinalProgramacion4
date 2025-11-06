import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '../../../Models/ENUM';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = "http://localhost:3000/Role"
  http = inject(HttpClient)

  getRoles(){
    return this.http.get<Role[]>(this.url)
  }

  getRoleById(id:number){
    return this.http.get<Role>(`http://localhost:3000/Role/${id}`)
  }
}
