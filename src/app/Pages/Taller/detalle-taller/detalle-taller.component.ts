import { Component, effect, inject, signal } from '@angular/core';
import { TallerServiceService } from '../../../Core/Services/Taller/TallerService/taller-service.service';
import { EspecialidadService } from '../../../Core/Services/Taller/EspecialidadService/especialidad-service';
import { UserServiceService } from '../../../Core/Services/UserService/user-service.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-detalle-taller',
  imports: [],
  templateUrl: './detalle-taller.component.html',
  styleUrl: './detalle-taller.component.css'
})
export class DetalleTallerComponent {
  
  activated = inject(ActivatedRoute)
  tallerservice = inject(TallerServiceService)
  especialidadservice = inject(EspecialidadService)
  userService = inject(UserServiceService)

  id = String(this.activated.snapshot.paramMap.get("id"))

  // Señal base
  taller = toSignal(this.tallerservice.getTallerByID(this.id))

  // Señales vacías para completar luego
  encargado = signal<any>(null)
  especialidad = signal<any>(null)

  constructor() {
    effect(() => {
      const t = this.taller();
      if (!t) return;

      // Cargar encargado
      this.userService.getUserById(t.Encargado).subscribe(u => this.encargado.set(u));

      // Cargar especialidad
      this.especialidadservice.getEspecialidadByID(t.Especialidad)
        .subscribe(e => this.especialidad.set(e));
    });
  }
}
