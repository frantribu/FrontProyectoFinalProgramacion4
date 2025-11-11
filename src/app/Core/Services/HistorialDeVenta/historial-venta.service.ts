import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HistorialDeVentas } from '../../Models/HistorialDeVentas';

@Injectable({
  providedIn: 'root'
})
export class HistorialDeVentaService {
  http=inject(HttpClient)
  URL="http://localhost:3000/historialesVenta"

  getHistorialDeVentas(){
    return this.http.get<HistorialDeVentas[]>(this.URL)
  }

  postHistorialDeVentas(venta:Partial<HistorialDeVentas>){
    return this.http.post<HistorialDeVentas>(this.URL, venta)
  }
}
