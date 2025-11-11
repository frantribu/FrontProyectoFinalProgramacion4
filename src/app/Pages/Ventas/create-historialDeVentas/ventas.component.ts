import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { AltaDeVentaService } from '../../../Core/Services/AltaDeVenta/alta-de-venta.service';
import { Router } from '@angular/router';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';

@Component({
  selector: 'app-ventas',
  imports: [ReactiveFormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class CreateVentaComponent {
  fb=inject(FormBuilder)
  altaDeVentaService=inject(AltaDeVentaService)
  router=inject(Router)
  vehiculoService=inject(VehiculoService)
  userService=inject(UserServiceService)

  rolIdCliente=4

  vehiculos=toSignal(this.vehiculoService.getVehiculos(), {initialValue:[]})

  clientes=toSignal(this.userService.getClientes(this.rolIdCliente))
  
  busqueda=signal("")

  clientesFiltrados=computed(()=>{
    const filtro=this.busqueda().toLowerCase();

    return this.clientes()?.filter(c=> `${c.nombre} ${c.apellido} ${c.dni}`.toLowerCase().includes(filtro))
  })

  form=this.fb.nonNullable.group({
    idVehiculo:['', [Validators.required]],
    idCliente:['', [Validators.required]],
    precioVenta:[0, [Validators.required]]
  })

  enviarVenta(){
    const venta:Partial<HistorialDeVentas>={
      vehiculo:this.form.value.idVehiculo,
      cliente:this.form.value.idCliente,
      precioVenta:this.form.value.precioVenta,
      fechaVenta:new Date().toISOString().split('T')[0]
    }

    this.altaDeVentaService.postHistorialDeVentas(venta).subscribe({
      next: ()=>this.router.navigate(['historialDeVentas']),
      error:(err)=>console.log("Error al vender el vehiculo ", err)
    })
  }
}
