import { Routes } from '@angular/router';

export const routes: Routes = [

    //HOME
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", loadComponent: () => import("./Pages/Home/home-component/home-component.component").then(c => c.HomeComponentComponent) },


    { path: "login", loadComponent: () => import("./Pages/login/login.component").then(c => c.LoginComponent) },

    //VEHICULOS
    { path: "vehiculos", loadComponent: () => import("./Pages/Vehicles/list-vehicles/list-vehicles.component").then(c => c.ListVehiclesComponent) },
    { path: "vehiculos/modificarMoto/:id", loadComponent: () => import("./Pages/Vehicles/Motorbike/modificar-moto/modificar-moto.component").then(c => c.ModificarMotoComponent) },
    { path: "vehiculos/modificarAuto/:id", loadComponent: () => import("./Pages/Vehicles/Car/modificar-auto/modificar-auto.component").then(c => c.ModificarAutoComponent) },
    { path: "vehiculos/detalleMoto/:id", loadComponent: () => import("./Pages/Vehicles/Motorbike/detalle-moto/detalle-moto.component").then(c => c.DetalleMotoComponent) },
    { path: "vehiculos/detalleAuto/:id", loadComponent: () => import("./Pages/Vehicles/Car/detalle-auto/detalle-auto.component").then(c => c.DetalleAutoComponent) },
    { path: "vehiculos/agregar", loadComponent: () => import("./Pages/Vehicles/create-vehicle-component/create-car-component.component").then(c => c.CreateVehicleComponent) },

    //USERS
    { path: "usuarios", loadComponent: () => import("./Pages/User/list-users/list-users.component").then(c => c.ListUsersComponent) },
    { path: "usuarios/detalle/:id", loadComponent: () => import("./Pages/User/detalle-user/detalle-user.component").then(c => c.DetalleUserComponent) },
    { path: "usuarios/modificar/:id", loadComponent: () => import("./Pages/User/modify-user/modify-user.component").then(c => c.ModifyUserComponent) },
    { path: "usuarios/agregar", loadComponent: () => import("./Pages/User/create-user/create-user.component").then(c => c.CreateUserComponent) },
    //TALLERES
    {
        path: "talleres", loadComponent: () => import("./Pages/Taller/list-taller/list-taller").then(c => c.ListTaller)
    },
    {
        path: "talleres/agregar", loadComponent: () => import("./Pages/Taller/create-taller/create-taller").then(c => c.CreateTaller)
    },
   
    { path: "**", redirectTo: "home", pathMatch: "full" }


];
