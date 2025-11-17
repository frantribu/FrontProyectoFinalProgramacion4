import { LookupItem } from "./Enum";
import { User } from "./User";
import { Vehiculo } from "./Vehiculo";

export interface Taller{
    id: string,
    Especialidad: LookupItem,
    NombreTaller: string,
    Encargado: string,
    Vehiculos: Vehiculo[],
    Direccion: string
}

