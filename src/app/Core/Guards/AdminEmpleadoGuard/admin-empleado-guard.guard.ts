import { CanActivateFn, Router } from '@angular/router';
import { RolesService } from '../../Services/RolService/roles.service';
import { UserServiceService } from '../../Services/UserService/user-service.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminEmpleadoGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const rolService = inject(RolesService);
  const userService = inject(UserServiceService);

  const user = userService.obtenerUsuarioEnSesion();
  if (!user) return router.createUrlTree(['login']);

  return rolService.getRoleById(user.idRol).pipe(
    map(r => {
      const allowedRoles = ["ADMIN", "EMPLEADO"];
      return allowedRoles.includes(r.name) ? true : router.createUrlTree(['home']);
    })
  );
};
