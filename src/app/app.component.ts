import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateVehicleComponent } from "./Pages/Vehicles/create-vehicle-component/create-car-component.component";
import { ListVehiclesComponent } from "./Pages/Vehicles/list-vehicles/list-vehicles.component";
import { DetalleAutoComponent } from "./Pages/Vehicles/Car/detalle-auto/detalle-auto.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateVehicleComponent, ListVehiclesComponent, DetalleAutoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinalProgramacion4Angular';
}
