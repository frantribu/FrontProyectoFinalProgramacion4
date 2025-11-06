/**
 * Interfaz base para todas las tablas de lookup (Enums)
 * Ejemplo: Role, Combustion, TipoAuto, etc.
 */
export interface LookupItem {
  id: string;
  name: string;
}

// Interfaces específicas (opcionales pero útiles para tipado)
export interface Role extends LookupItem {}
export interface Combustion extends LookupItem {}
export interface TipoAuto extends LookupItem {}
export interface TipoMoto extends LookupItem {}
export interface Especialidad extends LookupItem {}

export interface ArchivoVehiculo extends File{
  urlLocal ?: string
  rutaSimulada ?: string
}