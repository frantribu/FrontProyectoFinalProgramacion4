import { Component, inject, OnDestroy, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArchivoVehiculo, Combustion, TipoAuto } from '../../../../Core/Models/Enum';
import { toSignal } from '@angular/core/rxjs-interop';
import { TypeCarService } from '../../../../Core/Services/Vehicle/Car/TypeCar/type-car.service';
import { CombustionService } from '../../../../Core/Services/Vehicle/Car/Combustion/combustion.service';
import { Auto } from '../../../../Core/Models/Vehicles';
import { AutoService } from '../../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { ImagenService } from '../../../../Core/Services/ImagenService/imagen-service.service';

@Component({
  selector: 'app-create-vehicle-component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-car-component.component.html',
  styleUrl: './create-car-component.component.css'
})
export class CreateCarComponent implements OnDestroy {
  fb = inject(FormBuilder);
  servicioTipoAuto = inject(TypeCarService);
  servicioCombustion = inject(CombustionService);
  servicioVehiculo = inject(AutoService);
  servicioImages = inject(ImagenService);

  archivosSeleccionados: ArchivoVehiculo[] = [];

  tiposAuto: Signal<TipoAuto[] | undefined> = toSignal(this.servicioTipoAuto.getTypeCar());
  combustiones: Signal<Combustion[] | undefined> = toSignal(this.servicioCombustion.getCombustion());

  formularioCrearAuto = this.fb.nonNullable.group({
    patente: ["", [Validators.required, Validators.pattern("^(?:[A-Z]{2}[-\s]?[0-9]{3}[-\s]?[A-Z]{2}|[A-Z]{3}[-\s]?[0-9]{3})$")]],
    marca: ["", [Validators.required]],
    modelo: ["", [Validators.required]],
    precio: [null, [Validators.required, Validators.min(0)]],
    color: ["", [Validators.required]],
    anio: ["", [Validators.required, Validators.pattern(/^\d{4}$/)]],
    kilometros: [0, [Validators.required, Validators.min(0)]],
    motor: ["", [Validators.required]],
    combustion: [null, [Validators.required]],
    descripcion: ["", [Validators.required]],
    puertas: [3, [Validators.required, Validators.min(3)]],
    potencia: [0, [Validators.required, Validators.min(0)]],
    tipoAuto: [null, [Validators.required]]
  });

  onFileSelected(event: any) {
    const files = event.target.files;

    this.archivosSeleccionados = this.servicioImages.procesarArchivos(files)
  }

  ngOnDestroy(): void {
    this.servicioImages.limpiarURLsTemporales(this.archivosSeleccionados)
  }

  enviarFormularioCrearAuto() {
    if (this.formularioCrearAuto.invalid) {
      console.error("El formulario es inválido. Revise los campos.");
      return;
    }

    const rutasImagenParaGuardar = this.servicioImages.obtenerRutasParaDB(this.archivosSeleccionados)

    const auto: Partial<Auto> = {
      patente: this.formularioCrearAuto.value.patente,
      marca: this.formularioCrearAuto.value.marca,
      modelo: this.formularioCrearAuto.value.modelo,
      precio: this.formularioCrearAuto.value.precio ?? undefined,
      color: this.formularioCrearAuto.value.color,
      año: Number(this.formularioCrearAuto.value.anio),
      kilometros: this.formularioCrearAuto.value.kilometros,
      motor: this.formularioCrearAuto.value.motor,
      idCombustion: this.formularioCrearAuto.value.combustion ?? undefined,
      descripcion: this.formularioCrearAuto.value.descripcion,
      puertas: this.formularioCrearAuto.value.puertas,
      potencia: this.formularioCrearAuto.value.potencia,
      idTipoCarroceria: this.formularioCrearAuto.value.tipoAuto ?? undefined,

      rutasImagen : rutasImagenParaGuardar,


      fechaIngreso: new Date().toISOString().split('T')[0],
      enReparacion: false,
      vendido: false
    };

    this.servicioVehiculo.postAuto(auto).subscribe({
      next: () => console.log("Vehiculo cargado")
    });
  }




}