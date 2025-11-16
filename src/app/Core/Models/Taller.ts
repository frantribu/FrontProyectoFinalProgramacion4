import { Vehiculo } from "./Vehiculo";

export interface Taller{
    id: string,
    Especialidad: string,
    NombreTaller: string,
    Encargado: string,
    Vehiculos: Vehiculo[],
    Direccion: string
}

