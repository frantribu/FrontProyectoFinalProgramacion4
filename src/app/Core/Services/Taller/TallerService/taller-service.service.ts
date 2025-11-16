import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../../../Models/Taller';


@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {
  http = inject(HttpClient)
  url = "http://localhost:3000/talleres"

  getTalleres(){
    return this.http.get<Taller[]>(this.url)
  }

  getTallerByID(id:string){
    return this.http.get<Taller>(`${this.url}/${id}`)
  }
  
  patchTaller(taller:Taller){
    this.http.patch<Taller>(this.url, taller).subscribe({
      next: () => alert("el taller fue modificado con exito!")
    })
  }

  postTaller(taller:Partial<Taller>){
    return this.http.post<Taller>(this.url,taller)
  }

  deleteTaller(id:string){
    return this.http.delete<Taller>(`${this.url}/${id}`).subscribe({
      next: () => alert("Taller creado con exito!!")
    })
  }
}
