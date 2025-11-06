/**
 * 3.1 Interfaz Base: Vehiculo
 * Refleja la estructura de la clase Vehiculo en el UML
 */
export interface Vehiculo {
  id : string;
  patente: string;
  marca: string;
  modelo: string;
  precio: number; // long
  color: string;
  anio: number; // long
  kilometros: number; // long
  motor: string;
  rutasImagen: string[];
  
  idCombustion: number; // long - Clave foránea al 'Combustion.id'
  
  descripcion: string;
  fechaIngreso: string; // LocalDate -> string (ISO 8601)
  enReparacion: boolean;
  vendido: boolean;
}

/**
 * 3.2 Interfaz Específica: Auto
 * Extiende Vehiculo y usa idTipoCarroceria
 */
export interface Auto extends Vehiculo {
  puertas: number; // long
  potencia: number; // long
  
  idTipoCarroceria: number; // long - Clave foránea al 'TipoAuto.id'
}

/**
 * 3.3 Interfaz Específica: Moto (por completitud)
 */
export interface Moto extends Vehiculo {
  cilindrada: number; // long
  
  idTipoCarroceriaMoto: number; // long - Clave foránea al 'TipoMoto.id'
}