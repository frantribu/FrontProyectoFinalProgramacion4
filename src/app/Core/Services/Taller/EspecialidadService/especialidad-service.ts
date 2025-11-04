import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Especialidad } from '../../../Models/ENUM';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  http = inject(HttpClient)
  url = "http://localhost:3000/Especilidad"

  getEspecialidades(){
    return this.http.get<Especialidad[]>(this.url);
  }

  getEspecialidadByID(id:string){
    return this.http.get<Especialidad>(`${this.url}/${id}`);
  }
}
