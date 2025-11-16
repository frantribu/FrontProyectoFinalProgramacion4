import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Role } from '../../Models/Enum';
import { map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = "http://localhost:3000/roles"
  http = inject(HttpClient)

  getRoles(){
    return this.http.get<Role[]>(this.url)
  }

  getRoleById(id:number){
    return this.http.get<Role>(`${this.url}/${id}`)
  }

  getIdByRol(rol:string){
    return this.http.get<Role[]>(`${this.url}?name=${rol}`).pipe(
      map(rol => rol[0]))
  }
}