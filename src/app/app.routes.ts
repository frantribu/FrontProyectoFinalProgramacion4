import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"vehiculos", loadComponent:()=>import("./Pages/Vehicles/list-vehicles/list-vehicles.component").then(c=>c.ListVehiclesComponent)},
    {path:"vehiculos/modificarMoto/:id", loadComponent:()=>import("./Pages/Vehicles/Motorbike/modificar-moto/modificar-moto.component").then(c=>c.ModificarMotoComponent)},
    {path:"vehiculos/modificarAuto/:id", loadComponent:()=>import("./Pages/Vehicles/Car/modificar-auto/modificar-auto.component").then(c=>c.ModificarAutoComponent)},
    {path:"vehiculos/detalleMoto/:id", loadComponent:()=>import("./Pages/Vehicles/Motorbike/detalle-moto/detalle-moto.component").then(c=>c.DetalleMotoComponent)},
    {path:"vehiculos/detalleAuto/:id", loadComponent:()=>import("./Pages/Vehicles/Car/detalle-auto/detalle-auto.component").then(c=>c.DetalleAutoComponent)},
    {path:"vehiculos/agregar", loadComponent:()=>import("./Pages/Vehicles/create-vehicle-component/create-car-component.component").then(c=>c.CreateVehicleComponent)}
];
