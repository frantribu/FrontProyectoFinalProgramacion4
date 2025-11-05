import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { CreateVehicleComponent } from "./Pages/Vehicles/create-vehicle-component/create-car-component.component";
import { ListVehiclesComponent } from "./Pages/Vehicles/list-vehicles/list-vehicles.component";
import { DetalleAutoComponent } from "./Pages/Vehicles/Car/detalle-auto/detalle-auto.component";
import { ModificarAutoComponent } from "./Pages/Vehicles/Car/modificar-auto/modificar-auto.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateVehicleComponent, ListVehiclesComponent, DetalleAutoComponent, ModificarAutoComponent],
=======

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
>>>>>>> f1f84748a4f14efba6e310750341005118fc07cc
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinalProgramacion4Angular';
}
