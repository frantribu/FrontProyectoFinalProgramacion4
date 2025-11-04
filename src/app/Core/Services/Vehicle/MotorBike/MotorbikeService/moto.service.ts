import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Moto } from '../../../../Models/Vehicles';

@Injectable({
  providedIn: 'root'
})
export class MotoService {
  http=inject(HttpClient)
  url="http://localhost:3000/motos"
  
  postMoto(moto:Partial<Moto>){
    return this.http.post<Moto>(this.url, moto)
  }

  updateMoto(moto:Moto){
    return this.http.put<Moto>(`${this.url}/${moto.id}`, moto)
  }

  deleteMoto(id:string){
    return this.http.delete<Moto>(`${this.url}/${id}`)
  }
}
