import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HistorialDeVentas } from '../../../Core/Models/HistorialDeVentas';
import { ActivatedRoute, Router, } from '@angular/router';
import { VehiculoService } from '../../../Core/Services/Vehicle/VehiculoService/vehiculo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { HistorialDeVentaService } from '../../../Core/Services/HistorialDeVenta/historial-venta.service';
import { User } from '../../../Core/Models/User';
import { ModalClienteComponent } from '../../../Shared/Components/modal-cliente/modal-cliente.component';
import { ModalModificarClienteComponent } from '../../../Shared/Components/modal-modificar-cliente/modal-modificar-cliente.component';

@Component({
  selector: 'app-ventas',
  imports: [ReactiveFormsModule, ModalClienteComponent, /*ModalModificarClienteComponent*/],
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

    effect(()=>{
      const v=this.vehiculo()

      if(v){
        this.form.get("precio")?.setValue(v.precioDeVenta)
      }
    })
  }

  cargarClientes() {
    this.userService.getClientes().subscribe({
      next: (cliente) => this.clientes.set(cliente)
    })
  }

  busquedaCliente = signal("")

  menuAbiertoCliente = false
  mostrarMenuModal = signal(false)

  // mostrarMenuModificar = signal(false)

  clientesFiltrados = computed(() => {
    const filtro = this.busquedaCliente().toLowerCase();

    return this.clientes()?.filter(c => `${c.nombre} ${c.apellido} ${c.dni}`.toLowerCase().includes(filtro))
  })

  form = this.fb.nonNullable.group({
    precio:[0,[Validators.required, Validators.min(0)]],
    idCliente: ['', [Validators.required]],
  })

  enviarVenta() {
    const venta: Partial<HistorialDeVentas> = {
      vehiculo:this.idVehiculo!,
      cliente: this.form.value.idCliente,
      precio: this.form.value.precio,
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

  toggleMenu() {
    this.menuAbiertoCliente=!this.menuAbiertoCliente 
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

   volver(){
    this.router.navigate([`vehiculos/detalle${this.vehiculo()?.tipoVehiculo}/${this.idVehiculo}`])
  }
  //Modificar Cliente
/* 
  abrirModalModificar(){
    this.mostrarMenuModificar.set(true)
  }

  cerrarModalModificar(){
    this.mostrarMenuModificar.set(false)
  }

 actualizarCliente(cliente:User){
    const listaClientes = this.clientes()
  }*/
}
