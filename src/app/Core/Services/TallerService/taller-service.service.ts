import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Taller } from '../../Models/Taller';

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {
  http = inject(HttpClient)
  
  postTaller(taller:Partial<Taller>){
    return this.http.post<Taller>("", taller)
  }
  
}
