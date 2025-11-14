import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<<< HEAD:src/app/Core/Services/Taller/TallerService/taller-service.service.ts
import { Taller } from '../../../Models/Taller';

========
import { Taller } from '../../Models/Taller';
>>>>>>>> origin/Test:src/app/Core/Services/TallerService/taller-service.service.ts

@Injectable({
  providedIn: 'root'
})
export class TallerServiceService {
  http = inject(HttpClient)

  getTalleres(){
    return this.http.get<Taller[]>("")
  }
  
  postTaller(taller:Partial<Taller>){
    return this.http.post<Taller>("", taller)
  }
}
