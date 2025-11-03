import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Auto, Moto } from '../../../Models/Vehicles';

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
        const autosConTipo: VehiculoPolimorfico[] = resultados.autos.map(auto => ({
          ...auto,
          tipoVehiculo: 'Auto' as const
        }));
        const motosConTipo: VehiculoPolimorfico[] = resultados.motos.map(moto => ({
          ...moto,
          tipoVehiculo: 'Moto' as const
        }));

        const vehiculosCombinados = [...autosConTipo, ...motosConTipo];

        return vehiculosCombinados;
      })
    )
  }


}
