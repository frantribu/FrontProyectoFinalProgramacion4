import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { ActivatedRoute, Router, } from '@angular/router';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { HistorialDeVentaService } from '../../../Core/Services/HistorialDeVenta/historial-venta.service';
import { User } from '../../../Core/Models/User';
import { ModalClienteComponent } from '../../../Shared/Components/modal-cliente/modal-cliente.component';

@Component({
  selector: 'app-ventas',
  imports: [ReactiveFormsModule, ModalClienteComponent],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})

export class CreateVentaComponent {
  fb = inject(FormBuilder)
  altaDeVentaService = inject(HistorialDeVentaService)
  router = inject(Router)
  vehiculoService = inject(VehiculoService)
  userService = inject(UserServiceService)
  activatedRouter=inject(ActivatedRoute)

  rolIdCliente = 4

  clientes = signal<User[]>([])

  idVehiculo=this.activatedRouter.snapshot.paramMap.get("id")
  vehiculo=toSignal(this.vehiculoService.getVehiculoById(this.idVehiculo!))

  constructor() {
    this.cargarClientes()
  }

  cargarClientes() {
    this.userService.getClientes().subscribe({
      next: (cliente) => this.clientes.set(cliente)
    })
  }

  busquedaCliente = signal("")

  menuAbiertoVehiculo = false
  menuAbiertoCliente = false
  mostrarMenuModal = signal(false)


  clientesFiltrados = computed(() => {
    const filtro = this.busquedaCliente().toLowerCase();

    return this.clientes()?.filter(c => `${c.nombre} ${c.apellido} ${c.dni}`.toLowerCase().includes(filtro))
  })

  form = this.fb.nonNullable.group({
    idVehiculo: [''],
    idCliente: ['', [Validators.required]],
  })

  enviarVenta() {
    const venta: Partial<HistorialDeVentas> = {
      vehiculo:this.idVehiculo!,
      cliente: this.form.value.idCliente,
      precio: this.vehiculo()?.precioDeVenta,
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
      this.menuAbiertoVehiculo=!this.menuAbiertoVehiculo
    } else {
      this.menuAbiertoCliente=!this.menuAbiertoCliente
    }
  }

  seleccionarCliente(cliente: User) {
    this.form.get("idCliente")?.setValue(cliente.id)
    this.busquedaCliente.set(`${cliente.nombre} ${cliente.apellido} | ${cliente.dni}`)
  }

  abrirModalCliente() {
    this.mostrarMenuModal.set(true)
  }

  cerrarModalCliente() {
    this.mostrarMenuModal.set(false)
  }

  agregarClienteALista(cliente: User) {
    const clientesActuales = this.clientes()

    this.clientes.set([...clientesActuales, cliente])
    this.seleccionarCliente(cliente)
  }
}
