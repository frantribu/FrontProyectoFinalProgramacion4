import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateCarComponent } from "./Pages/Vehicles/Car/create-vehicle-component/create-car-component.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateCarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyectoFinalProgramacion4Angular';
}
