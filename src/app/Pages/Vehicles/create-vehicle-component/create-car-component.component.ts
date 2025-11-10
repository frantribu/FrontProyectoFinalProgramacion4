import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArchivoVehiculo } from '../../../Core/Models/ENUM';
import { toSignal } from '@angular/core/rxjs-interop';
import { TypeCarService } from '../../../Core/Services/Vehicle/Car/TypeCar/type-car.service';
import { CombustionService } from '../../../Core/Services/Vehicle/Combustion/combustion.service';
import { AutoService } from '../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { ImagenService } from '../../../Core/Services/ImagenService/imagen-service.service';
import { TypeMotorbikeService } from '../../../Core/Services/Vehicle/MotorBike/TypeMotorBike/type-motorbike.service';
import { MotoService } from '../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';
import { Auto, Moto } from '../../../Core/Models/Vehiculo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vehicle-component',
  imports: [ReactiveFormsModule],
  templateUrl: './create-car-component.component.html',
  styleUrl: './create-car-component.component.css'
})
export class CreateVehicleComponent implements OnDestroy {
  fb = inject(FormBuilder);
  servicioTipoAuto = inject(TypeCarService);//AUTO
  servicioCombustion = inject(CombustionService);
  servicioAuto = inject(AutoService);
  servicioTipoCarroceria = inject(TypeMotorbikeService);//MOTO
  servicioMoto = inject(MotoService)
  servicioImages = inject(ImagenService);
  tipo = signal<string>("");

  archivosSeleccionados: ArchivoVehiculo[] = [];
  combustiones = toSignal(this.servicioCombustion.getCombustion(), { initialValue: [] });

  //AUTO
  tiposAuto = toSignal(this.servicioTipoAuto.getTypeCar(), { initialValue: [] });

  //MOTO
  tipoDeCarroceria = toSignal(this.servicioTipoCarroceria.getTypeCarroceria(), { initialValue: [] })

  router = inject(Router)

  tipoDeVehiculo(tipo: string) {
    this.tipo.set(tipo)
  }

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

  formularioCrearMoto = this.fb.nonNullable.group({
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
    cilindrada: [0, [Validators.required]],
    tipoMoto: [null, [Validators.required]]
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
      anio: Number(this.formularioCrearAuto.value.anio),
      kilometros: this.formularioCrearAuto.value.kilometros,
      motor: this.formularioCrearAuto.value.motor,
      idCombustion: this.formularioCrearAuto.value.combustion ?? undefined,
      descripcion: this.formularioCrearAuto.value.descripcion,
      puertas: this.formularioCrearAuto.value.puertas,
      potencia: this.formularioCrearAuto.value.potencia,
      idTipoCarroceria: this.formularioCrearAuto.value.tipoAuto ?? undefined,

      rutasImagen: rutasImagenParaGuardar,


      fechaIngreso: new Date().toISOString().split('T')[0],
      enReparacion: false,
      vendido: false
    };

    this.servicioAuto.postAuto(auto).subscribe({
      next: () => {
        console.log("Vehiculo cargado")
        this.router.navigate(["vehiculos"])
      },
      error: (err)=>console.log("Error al cargar el auto ", err)
    });
  }

  enviarFormularioCrearMoto() {
    if (this.formularioCrearMoto.invalid) {
      console.error("El formulario es inválido. Revise los campos.");
      return;
    }

    const rutasImagenParaGuardar = this.servicioImages.obtenerRutasParaDB(this.archivosSeleccionados)

    const moto: Partial<Moto> = {
      patente: this.formularioCrearMoto.value.patente,
      marca: this.formularioCrearMoto.value.marca,
      modelo: this.formularioCrearMoto.value.modelo,
      precio: this.formularioCrearMoto.value.precio ?? undefined,
      color: this.formularioCrearMoto.value.color,
      anio: Number(this.formularioCrearMoto.value.anio),
      kilometros: this.formularioCrearMoto.value.kilometros,
      motor: this.formularioCrearMoto.value.motor,
      idCombustion: this.formularioCrearMoto.value.combustion ?? undefined,
      descripcion: this.formularioCrearMoto.value.descripcion,
      cilindrada: this.formularioCrearMoto.value.cilindrada,
      idTipoCarroceria: this.formularioCrearMoto.value.tipoMoto ?? undefined,

      rutasImagen: rutasImagenParaGuardar,

      fechaIngreso: new Date().toISOString().split('T')[0],
      enReparacion: false,
      vendido: false
    };

    this.servicioMoto.postMoto(moto).subscribe({
      next: () => {
        console.log("Vehiculo cargado");
        this.router.navigate(["vehiculos"])
      },
      error: (err) => console.log("Error al cargar la moto ", err)
    });
  }

  enviarVehiculo() {
    const tipoDeVehiculo = this.tipo();

    if (tipoDeVehiculo === "Auto") {
      this.enviarFormularioCrearAuto();
    } else if (tipoDeVehiculo === "Moto") {
      this.enviarFormularioCrearMoto();
    } else {
      console.log("Tipode vehiculo no definido")
    }
  }

  tipoDeFormulario() {
    return this.tipo() === "Auto" ? this.formularioCrearAuto : this.formularioCrearMoto
  }

  volver(){
    this.router.navigate([''])
  }
}