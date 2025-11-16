import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../../Services/UserService/user-service.service';
import { RolesService } from '../../Services/RolService/roles.service';
import { map } from 'rxjs';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const userService=inject(UserServiceService)
  const rolService=inject(RolesService)
  const user=userService.obtenerUsuarioEnSesion()

  if(!user){
    return router.createUrlTree(['login'])
  }

  return rolService.getRoleById(user.idRol).pipe(
    map((r)=>r.name==="ADMIN" ? true : router.createUrlTree(['home']))
  )
};
