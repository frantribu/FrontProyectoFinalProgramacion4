import { Component, effect, inject } from '@angular/core';
import { AutoService } from '../../../../Core/Services/Vehicle/Car/CarService/auto.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CombustionService } from '../../../../Core/Services/Vehicle/Combustion/combustion.service';
import { TypeCarService } from '../../../../Core/Services/Vehicle/Car/TypeCar/type-car.service';
import { Auto } from '../../../../Core/Models/Vehiculo';

@Component({
  selector: 'app-modificar-auto',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-auto.component.html',
  styleUrl: './modificar-auto.component.css'
})
export class ModificarAutoComponent {
  autoService = inject(AutoService)
  router = inject(ActivatedRoute)
  combustionService = inject(CombustionService)
  servicioTipoAuto = inject(TypeCarService)
  servicioAuto = inject(AutoService)
  fb = inject(FormBuilder)

  id = this.router.snapshot.paramMap.get("id")

  auto = toSignal(this.autoService.getAutoById(this.id!));
  combustiones = toSignal(this.combustionService.getCombustion(), {initialValue : []})
  tiposAuto = toSignal(this.servicioTipoAuto.getTypeCar(), {initialValue:[]});

  constructor() {
    effect(() => {
      const a = this.auto();
      if (a) {
        this.formularioModificarAuto.patchValue({
          patente: a.patente,
          marca: a.marca,
          modelo: a.modelo,
          precio: a.precio,
          color: a.color,
          anio: String(a.anio),
          kilometros: a.kilometros,
          motor: a.motor,
          combustion: a.idCombustion,
          descripcion : a.descripcion,
          puertas : a.puertas,
          potencia : a.potencia,
          tipoAuto : a.idCombustion
        })
      }
    })

  }

  formularioModificarAuto = this.fb.nonNullable.group({
    patente: ["", [Validators.required, Validators.pattern("^(?:[A-Z]{2}[-\s]?[0-9]{3}[-\s]?[A-Z]{2}|[A-Z]{3}[-\s]?[0-9]{3})$")]],
    marca: ["", [Validators.required]],
    modelo: ["", [Validators.required]],
    precio: [0, [Validators.required, Validators.min(0)]],
    color: ["", [Validators.required]],
    anio: ["", [Validators.required, Validators.pattern(/^\d{4}$/)]],
    kilometros: [0, [Validators.required, Validators.min(0)]],
    motor: ["", [Validators.required]],
    combustion: [0, [Validators.required]],
    descripcion: ["", [Validators.required]],
    puertas: [3, [Validators.required, Validators.min(3)]],
    potencia: [0, [Validators.required, Validators.min(0)]],
    tipoAuto: [0, [Validators.required]]
  });


  
  enviar(){
    if (this.formularioModificarAuto.invalid) {
          console.error("El formulario es inválido. Revise los campos.");
          return;
        }
  
    
        const auto: Auto = {
          id : this.auto()!.id,
          patente: this.formularioModificarAuto.value.patente!,
          marca: this.formularioModificarAuto.value.marca!,
          modelo: this.formularioModificarAuto.value.modelo!,
          precio: this.formularioModificarAuto.value.precio!,
          color: this.formularioModificarAuto.value.color!,
          anio: Number(this.formularioModificarAuto.value.anio),
          kilometros: this.formularioModificarAuto.value.kilometros!,
          motor: this.formularioModificarAuto.value.motor!,
          idCombustion: this.formularioModificarAuto.value.combustion!,
          descripcion: this.formularioModificarAuto.value.descripcion!,
          puertas: this.formularioModificarAuto.value.puertas!,
          potencia: this.formularioModificarAuto.value.potencia!,
          idTipoCarroceria: this.formularioModificarAuto.value.tipoAuto!,  
          fechaIngreso: new Date().toISOString().split('T')[0],
          enReparacion: false,
          rutasImagen : this.auto()?.rutasImagen!,
          vendido: false
        };
    
        this.servicioAuto.putAuto(auto).subscribe({
          next: () => console.log("Vehiculo cargado")
        });
  }
}
