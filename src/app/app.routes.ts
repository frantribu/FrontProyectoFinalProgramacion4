import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"vehiculos", loadComponent:()=>import("./Pages/Vehicles/list-vehicles/list-vehicles.component").then(c=>c.ListVehiclesComponent)},
    {path:"vehiculos/modificarMoto/:id", loadComponent:()=>import("./Pages/Vehicles/Motorbike/modificar-moto/modificar-moto.component").then(c=>c.ModificarMotoComponent)},
    {path:"vehiculos/detalle/:id", loadComponent:()=>import("./Pages/Vehicles/Motorbike/detalle-moto/detalle-moto.component").then(c=>c.DetalleMotoComponent)}
];
