import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../../../Models/Taller';


@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {
  http = inject(HttpClient)
  url = ""

  getTalleres(){
    return this.http.get<Taller[]>(this.url)
  }

  getTallerByID(id:string){
    return this.http.get<Taller>(`${this.url}/${id}`)
  }
  
  putTaller(taller:Partial<Taller>){
    return this.http.put<Taller>(this.url, taller)
  }

  postTaller(taller:Taller){
    return this.http.post<Taller>(this.url,taller)
  }
}
