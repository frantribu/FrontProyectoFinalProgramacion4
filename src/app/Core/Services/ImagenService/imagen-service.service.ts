import { Injectable } from '@angular/core';
import { ArchivoVehiculo } from '../../Models/Enum';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private BASE_IMAGE_PATH = 'app/Assets/ImgVehiculos/';

  procesarArchivos(files: FileList | null): ArchivoVehiculo[] {
    if (!files || files.length === 0) {
      return [];
    }

    const archivos: ArchivoVehiculo[] = Array.from(files).map(file => {
      const urlLocal = URL.createObjectURL(file);
      const rutaSimulada = `${this.BASE_IMAGE_PATH}${file.name}`;
      const archivoVehiculo: ArchivoVehiculo = Object.assign(file, { urlLocal, rutaSimulada })
      return archivoVehiculo;
    })
    return archivos;
  }

  limpiarURLsTemporales(archivos: ArchivoVehiculo[]): void {
    archivos.forEach(archivo => {
      if (archivo.urlLocal) {
        URL.revokeObjectURL(archivo.urlLocal);
      }
    });
  }

  obtenerRutasParaDB(archivos: ArchivoVehiculo[]): string[] {
    return archivos
      .map(archivo => archivo.rutaSimulada || '')
      .filter(ruta => ruta.length > 0);
  }
}
