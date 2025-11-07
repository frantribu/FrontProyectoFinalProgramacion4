import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:"full"},
    {path:"login", loadComponent:()=>import("./Pages/login/login.component").then(c=>c.LoginComponent)},
    
    //TALLER
    {path:"taller/agregar", loadComponent:()=>import("./Pages/Taller/create-taller/create-taller").then(c=>c.CreateTaller)},
    {path:"taller/listar", loadComponent:()=>import("./Pages/Taller/list-taller/list-taller").then(c=>c.ListTaller)},
    {path:"taller/listar/id", loadComponent:()=>import("./Pages/Taller/list-taller/list-taller").then(c=>c.ListTaller)},
    {path:"taller/modificar/id", loadComponent:()=>import("./Pages/Taller/modificar-taller/modificar-taller").then(c=>c.ModificarTaller)}
];
