import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { UserServiceService } from '../../Services/UserService/user-service.service';

export const loginGuardGuard: CanActivateFn = () => {
  const router=inject(Router)
  const usuarioService=inject(UserServiceService)

  const user = usuarioService.obtenerUsuarioEnSesion();

  if(!user){
    return router.createUrlTree(['login'])
  }
  
  return true
}
