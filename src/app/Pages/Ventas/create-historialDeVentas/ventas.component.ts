import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { Router } from '@angular/router';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { HistorialDeVentaService } from '../../../Core/Services/HistorialDeVenta/historial-venta.service';
import { User } from '../../../Core/Models/User';
import { Vehiculo } from '../../../Core/Models/Vehiculo';

@Component({
  selector: 'app-ventas',
  imports: [ReactiveFormsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})

export class CreateVentaComponent {
  fb = inject(FormBuilder)
  altaDeVentaService = inject(HistorialDeVentaService)
  router = inject(Router)
  vehiculoService = inject(VehiculoService)
  userService = inject(UserServiceService)

  rolIdCliente = 4

  vehiculos = toSignal(this.vehiculoService.getVehiculos(), { initialValue: [] })
  clientes = toSignal(this.userService.getClientes(this.rolIdCliente))

  busquedaVehiculo = signal("")
  busquedaCliente = signal("")

  menuAbiertoVehiculo = false
  menuAbiertoCliente = false

  vehiculosFiltrados = computed(() => {
    const filtro = this.busquedaVehiculo().toLowerCase()

    return this.vehiculos().filter(v => `${v.marca} ${v.modelo} ${v.anio}`.toLowerCase().includes(filtro))
  })

  clientesFiltrados = computed(() => {
    const filtro = this.busquedaCliente().toLowerCase();

    return this.clientes()?.filter(c => `${c.nombre} ${c.apellido} ${c.dni}`.toLowerCase().includes(filtro))
  })

  form = this.fb.nonNullable.group({
    idVehiculo: ['', [Validators.required]],
    idCliente: ['', [Validators.required]],
    precioVenta: [0, [Validators.required]]
  })

  enviarVenta() {
    const venta: Partial<HistorialDeVentas> = {
      vehiculo: this.form.value.idVehiculo,
      cliente: this.form.value.idCliente,
      precioVenta: this.form.value.precioVenta,
      fechaVenta: new Date().toISOString().split('T')[0]
    }

    this.altaDeVentaService.postHistorialDeVentas(venta).subscribe({
      next: () => {
        this.vehiculoService.getVehiculoById(venta.vehiculo!).subscribe({
          next: (vehiculo) => this.vehiculoService.vehiculoVendido(vehiculo).subscribe({
            next: () => this.router.navigate(['historialDeVentas']),
            error: (err) => console.log("Error al cambiar el estado de vendido del vehiculo ", err)
          }),
          error: (err) => console.log("Error al obtener el vehiculo ", err)
        })
      },
      error: (err) => console.log("Error al cargar la venta ", err)
    })
  }

  toggleMenu(menu: 'vehiculo' | 'cliente') {
    if (menu === "vehiculo") {
      this.menuAbiertoVehiculo = !this.menuAbiertoVehiculo
    } else{
      this.menuAbiertoCliente = !this.menuAbiertoCliente
    }
  }

  seleccionarCliente(cliente: User) {
    this.form.get("idCliente")?.setValue(cliente.id)
    this.busquedaCliente.set(`${cliente.nombre} ${cliente.apellido} | ${cliente.dni}`)
  }

  seleccionarVehiculo(vehiculo: Vehiculo) {
    this.form.get("idVehiculo")?.setValue(vehiculo.id)
    this.busquedaVehiculo.set(`${vehiculo.marca} ${vehiculo.modelo} | ${vehiculo.patente}`)
  }

}
