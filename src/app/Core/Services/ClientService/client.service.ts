import { HttpClient } from '@angular/common/http';
import { inject, Injectable, effect } from '@angular/core';
import { User } from '../../Models/User';
import { RolesService } from '../RolService/roles.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  http = inject(HttpClient)
  url = "http://localhost:3000/usuarios"
  serviceRol = inject(RolesService)

  getClientes() {
    return this.serviceRol.getIdByRol("CLIENTE").pipe(
      switchMap(objetoRol => { 
      return this.http.get<User[]>(`${this.url}?idRol=${objetoRol!.id}`);
    }));
  }

  postClient(client: Partial<User>){
    return this.http.post<User>(this.url, client)
  }

  patchClient(id: string, cliente: Partial<User>) {
    return this.http.patch(`${this.url}/${id}`, cliente)
  }








}
