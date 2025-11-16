import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoAuto } from '../../../../Models/Enum';


@Injectable({
  providedIn: 'root'
})
export class TypeCarService {
  http = inject(HttpClient);
  url = "http://localhost:3000/tiposAuto";

  getTypeCar() : Observable<TipoAuto[]>{
    return this.http.get<TipoAuto[]>(this.url);
  }

  getTypeCarById(id : number) : Observable<TipoAuto>{
    return this.http.get<TipoAuto>(`${this.url}/${id}`);
  }

}
