import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable } from 'rxjs';
import { Auto, Moto } from '../../../Models/Vehiculo';

export type VehiculoPolimorfico = (Auto & { tipoVehiculo: 'Auto' } | Moto & { tipoVehiculo: 'Moto' })

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {
  http = inject(HttpClient);
  url = "http://localhost:3000"


  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.url}/autos`);
  }

  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.url}/motos`);
  }

  getVehiculos(): Observable<VehiculoPolimorfico[]> {
    return forkJoin({
      autos: this.getAutos(),
      motos: this.getMotos()
    }).pipe(
      map(resultados => {
        const autosConTipo: VehiculoPolimorfico[] = resultados.autos.filter(v => !v.vendido).map(auto => ({
          ...auto,
          tipoVehiculo: 'Auto' as const
        }));
        const motosConTipo: VehiculoPolimorfico[] = resultados.motos.filter(v => !v.vendido).map(moto => ({
          ...moto,
          tipoVehiculo: 'Moto' as const
        }));

        const vehiculosCombinados = [...autosConTipo, ...motosConTipo];

        return vehiculosCombinados;
      })
    )
  }

  getVehiculoById(id:string){
    return this.http.get<Auto>(`${this.url}/autos/${id}`).pipe(
      map(v=>({...v, tipoVehiculo: "Auto"} as VehiculoPolimorfico)),
      catchError(()=>this.http.get<Moto>(`${this.url}/motos/${id}`).pipe(
        map(v=>({...v, tipoVehiculo:"Moto"} as VehiculoPolimorfico))
      ))
    )
  }

  vehiculoVendido(vehiculo:VehiculoPolimorfico) {
    const url=vehiculo.tipoVehiculo==="Auto" ? `${this.url}/autos/${vehiculo.id}` : `${this.url}/motos/${vehiculo.id}`

      const vehicle={
        ...vehiculo,
        vendido:true
      }
      
      return this.http.put(url, vehicle)
  }
}
