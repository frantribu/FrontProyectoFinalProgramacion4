import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../../Models/Taller';

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {
  http = inject(HttpClient)
  url = "http://localhost:3000/talleres"

  getTalleres(){
    return this.http.get<Taller[]>(this.url)
  }
  
  postTaller(taller:Partial<Taller>){
    return this.http.post<Taller>(this.url, taller)
  }
  
}
