export interface Vehiculo {
    id : string;
    patente: string;
    marca: string;
    modelo: string;
    precio: number; 
    color: string;
    año: number;
    kilometraje: number; 
    motor: string;
    idCombustion: number;
    descripcion: string;
    fechaIngreso: string; 
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
    idTipoCarroceria: number; // long - Clave foránea al 'TipoMoto.id'
  }