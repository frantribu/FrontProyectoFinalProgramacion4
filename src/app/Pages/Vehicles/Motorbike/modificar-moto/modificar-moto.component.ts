import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MotoService } from '../../../../Core/Services/Vehicle/MotorBike/MotorbikeService/moto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CombustionService } from '../../../../Core/Services/Vehicle/Combustion/combustion.service';
import { TypeMotorbikeService } from '../../../../Core/Services/Vehicle/MotorBike/TypeMotorBike/type-motorbike.service';
import { Moto } from '../../../../Core/Models/Vehiculo';

@Component({
  selector: 'app-modificar-moto',
  imports: [ReactiveFormsModule],
  templateUrl: './modificar-moto.component.html',
  styleUrl: './modificar-moto.component.css'
})
export class ModificarMotoComponent {
  fb=inject(FormBuilder)
  motoService=inject(MotoService)
  activatedRouter=inject(ActivatedRoute)
  servicioCombustion=inject(CombustionService)
  servicioTipoCarroceria=inject(TypeMotorbikeService)

  id=this.activatedRouter.snapshot.paramMap.get("id")

  moto=toSignal(this.motoService.getMotoById(this.id!))
  combustiones= toSignal(this.servicioCombustion.getCombustion(), {initialValue:[]});
  tipoDeCarroceria=toSignal(this.servicioTipoCarroceria.getTypeCarroceria(), {initialValue:[]})

  router=inject(Router)

  constructor(){
    effect(()=>{
      const motito=this.moto()

      if(motito){
        this.formularioCrearMoto.patchValue({
          patente: motito.patente,
          marca:motito.marca,
          modelo:motito.modelo,
          precio:motito.precio,
          color:motito.color,
          anio:String(motito.anio),
          kilometros:motito.kilometros,
          motor:motito.motor,
          combustion:motito.idCombustion,
          descripcion: motito.descripcion,
          cilindrada:motito.cilindrada,
          tipoMoto:motito.idTipoCarroceria
        })
      }
    })
  }

  formularioCrearMoto=this.fb.nonNullable.group({
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
    cilindrada:[0, [Validators.required]],
    tipoMoto:[0, [Validators.required]]
  })

  enviarFormularioModificarMoto() {
      if (this.formularioCrearMoto.invalid) {
        console.error("El formulario es inválido. Revise los campos.");
        return;
      }

      const motoNueva: Moto = {
        id:this.moto()!.id,
        patente: this.formularioCrearMoto.value.patente!,
        marca: this.formularioCrearMoto.value.marca!,
        modelo: this.formularioCrearMoto.value.modelo!,
        precio: this.formularioCrearMoto.value.precio!,
        color: this.formularioCrearMoto.value.color!,
        anio: Number(this.formularioCrearMoto.value.anio),
        kilometros: this.formularioCrearMoto.value.kilometros!,
        motor: this.formularioCrearMoto.value.motor!,
        idCombustion: this.formularioCrearMoto.value.combustion!,
        descripcion: this.formularioCrearMoto.value.descripcion!,
        cilindrada:this.formularioCrearMoto.value.cilindrada!,
        idTipoCarroceria: this.formularioCrearMoto.value.tipoMoto!,
  
        rutasImagen : this.moto()?.rutasImagen!,

        fechaIngreso: new Date().toISOString().split('T')[0],
        enReparacion: false,
        vendido: false
      };
  
      this.motoService.updateMoto(motoNueva).subscribe({
        next: () => {
          console.log("Vehiculo actualizado")
          this.router.navigate(["vehiculos"])
        },
        error:(err)=>console.log("Error al modificar la moto ", err)
      });
    }
}
