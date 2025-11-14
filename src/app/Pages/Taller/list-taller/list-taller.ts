import { Component, inject } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from "@angular/router";
import { TallerServiceService } from '../../../Core/Services/TallerService/taller-service.service';
import { CardTaller } from '../card-taller/card-taller';
@Component({
  selector: 'app-list-taller',
  imports: [CardTaller],
  templateUrl: './list-taller.html',
  styleUrl: './list-taller.css',
})
export class ListTaller {
  serviceTaller = inject(TallerServiceService)
  router = inject(Router)

  talleres = toSignal(this.serviceTaller.getTalleres(), {initialValue: []})
}
