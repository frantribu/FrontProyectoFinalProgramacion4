import { Routes } from '@angular/router';
import { adminGuardGuard } from './Core/Guards/AdminGuard/admin-guard.guard';
import { loginGuardGuard } from './Core/Guards/LoginGuard/login-guard.guard';
import { adminEmpleadoGuardGuard } from './Core/Guards/AdminEmpleadoGuard/admin-empleado-guard.guard';

export const routes: Routes = [
    { path: "login", loadComponent: () => import("./Pages/login/login.component").then(c => c.LoginComponent) },

    //HOME
    { path: "home", canActivate: [loginGuardGuard], loadComponent: () => import("./Pages/Home/home-component/home-component.component").then(c => c.HomeComponentComponent) },

    //PERFIL
    { path: "perfil", loadComponent: () => import("./Pages/Profile/profile/profile.component").then(c => c.ProfileComponent) },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", loadComponent: () => import("./Pages/login/login.component").then(c => c.LoginComponent) },

    //TALLER
    { path: "taller/agregar", loadComponent: () => import("./Pages/Taller/create-taller/create-taller").then(c => c.CreateTaller) },
    { path: "taller/listar", loadComponent: () => import("./Pages/Taller/list-taller/list-taller").then(c => c.ListTaller) },
    { path: "taller/listar/id", loadComponent: () => import("./Pages/Taller/list-taller/list-taller").then(c => c.ListTaller) },
    { path: "taller/modificar/id", loadComponent: () => import("./Pages/Taller/modificar-taller/modificar-taller").then(c => c.ModificarTaller) },

    //VEHICULOS
    { path: "vehiculos", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/list-vehicles/list-vehicles.component").then(c => c.ListVehiclesComponent) },
    { path: "vehiculos/modificarMoto/:id", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/Motorbike/modificar-moto/modificar-moto.component").then(c => c.ModificarMotoComponent) },
    { path: "vehiculos/modificarAuto/:id", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/Car/modificar-auto/modificar-auto.component").then(c => c.ModificarAutoComponent) },
    { path: "vehiculos/detalleAuto/:id", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/Car/detalle-auto/detalle-auto.component").then(c => c.DetalleAutoComponent) },
    { path: "vehiculos/detalleMoto/:id", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/Motorbike/detalle-moto/detalle-moto.component").then(c => c.DetalleMotoComponent) },
    { path: "vehiculos/agregar", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Vehicles/create-vehicle-component/create-car-component.component").then(c => c.CreateVehicleComponent) },

    //CLIENTES
    { path: "clientes", loadComponent: () => import("./Pages/Client/list-clients/client.component").then(c => c.ClientComponent) },
    { path: "clientes/agregar", loadComponent: () => import("./Pages/Client/create-client/create-client.component").then(c => c.CreateClientComponent) },
    { path: "clientes/modificar/:id", loadComponent: () => import("./Pages/Client/modify-client/modify-client.component").then(c => c.ModifyClientComponent) },

    //USERS
    { path: "usuarios", canActivate: [loginGuardGuard, adminGuardGuard], loadComponent: () => import("./Pages/User/list-users/list-users.component").then(c => c.ListUsersComponent) },
    { path: "usuarios/detalle/:id", canActivate: [loginGuardGuard, adminGuardGuard], loadComponent: () => import("./Pages/User/detalle-user/detalle-user.component").then(c => c.DetalleUserComponent) },
    { path: "usuarios/modificar/:id", canActivate: [loginGuardGuard, adminGuardGuard], loadComponent: () => import("./Pages/User/modify-user/modify-user.component").then(c => c.ModifyUserComponent) },
    { path: "usuarios/agregar", canActivate: [loginGuardGuard, adminGuardGuard], loadComponent: () => import("./Pages/User/create-user/create-user.component").then(c => c.CreateUserComponent) },

    //HISTORIAL DE VENTAS
    { path: "historialDeVentas", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Ventas/list-historial-de-ventas/list-historial-de-ventas.component").then(c => c.ListHistorialDeVentasComponent) },
    { path: "vender", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Ventas/create-historialDeVentas/ventas.component").then(c => c.CreateVentaComponent) },
    { path: "vender/:id", canActivate: [loginGuardGuard, adminEmpleadoGuardGuard], loadComponent: () => import("./Pages/Ventas/create-historialDeVentas/ventas.component").then(c => c.CreateVentaComponent) },

    { path: "**", redirectTo: "home", pathMatch: "full" }

];
