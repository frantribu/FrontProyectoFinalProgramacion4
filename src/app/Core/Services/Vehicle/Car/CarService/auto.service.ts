import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../../../../Models/Vehiculo';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  http = inject(HttpClient);
  url = "http://localhost:3000/autos";

  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.url);
  }

  getAutoById(id: string): Observable<Auto> {
    return this.http.get<Auto>(`${this.url}/${id}`);
  }
  
  postAuto(auto : Partial<Auto>){
    return this.http.post(this.url,auto)
  }

  putAuto(auto : Auto){
    return this.http.put(`${this.url}/${auto.id}`,auto)
  }

    deleteAuto(id:string){
      return this.http.delete<Auto>(`${this.url}/${id}`)
    }
}
