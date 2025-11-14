import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserServiceService } from './Core/Services/UserService/user-service.service';
import { TallerServiceService } from './Core/Services/Taller/TallerService/taller-service.service';
<<<<<<< HEAD
=======
import { ClientService } from './Core/Services/ClientService/client.service';
import { RolesService } from './Core/Services/RolService/roles.service';
>>>>>>> origin/CON-37-ABM-de-Cliente

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withFetch()),
  { provide: UserServiceService },
<<<<<<< HEAD
  { provide: TallerServiceService}
=======
  { provide: TallerServiceService},
  { provide: ClientService },
  { provide: RolesService }
>>>>>>> origin/CON-37-ABM-de-Cliente
  ]
};
