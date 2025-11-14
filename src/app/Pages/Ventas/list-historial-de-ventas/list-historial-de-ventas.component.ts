import { Component, inject } from '@angular/core';
import { HistorialDeVentaService } from '../../../Core/Services/HistorialDeVenta/historial-venta.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardVentaComponent } from "../../../Shared/Components/card-venta/card-venta.component";

@Component({
  selector: 'app-list-historial-de-ventas',
  imports: [CardVentaComponent],
  templateUrl: './list-historial-de-ventas.component.html',
  styleUrl: './list-historial-de-ventas.component.css'
})
export class ListHistorialDeVentasComponent {
  ventasService=inject(HistorialDeVentaService)

  ventas=toSignal(this.ventasService.getHistorialDeVentas(), {initialValue:[]})
}
