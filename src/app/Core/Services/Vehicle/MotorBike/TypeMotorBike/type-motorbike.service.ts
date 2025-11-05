import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoMoto } from '../../../../Models/Enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeMotorbikeService {
  http=inject(HttpClient)
  url = "http://localhost:3000/tiposMoto";

  getTypeCarroceria():Observable<TipoMoto[]>{
    return this.http.get<TipoMoto[]>(this.url)
  }

  getTypeCarroceriaById(id:number):Observable<TipoMoto>{
    return this.http.get<TipoMoto>(`${this.url}/${id}`)
  }
}
