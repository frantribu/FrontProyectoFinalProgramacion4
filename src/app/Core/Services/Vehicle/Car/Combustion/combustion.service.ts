import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Combustion, TipoAuto } from '../../../../Models/Enum';

@Injectable({
  providedIn: 'root'
})
export class CombustionService {
  http = inject(HttpClient);
  url = "http://localhost:3000/combustiones";

  getCombustion() : Observable<TipoAuto[]>{
    return this.http.get<TipoAuto[]>(this.url);
  }

  getCombustionById(id : number) : Observable<Combustion>{
    return this.http.get<Combustion>(`${this.url}/${id}`);
  }
}
