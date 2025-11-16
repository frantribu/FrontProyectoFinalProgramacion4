import { Component, inject } from '@angular/core';
import { ClientService } from '../../../Core/Services/ClientService/client.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardClientComponent } from '../../../Shared/Components/card-client/card-client/card-client.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  imports: [CardClientComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  service = inject(ClientService)
  clientes = toSignal(this.service.getClientes(), {initialValue:[]})
  router=inject(Router)

  volver(){
    this.router.navigate([''])  
  }
}
