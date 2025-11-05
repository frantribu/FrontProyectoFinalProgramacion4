import { Routes } from '@angular/router';
import { ModificarMotoComponent } from './Pages/Vehicles/Motorbike/modificar-moto/modificar-moto.component';
import { ListVehiclesComponent } from './Pages/Vehicles/list-vehicles/list-vehicles.component';

export const routes: Routes = [
    {path:"vehiculos", component: ListVehiclesComponent},
    {path:"vehiculos/modificarMoto/:id", component: ModificarMotoComponent}
];
