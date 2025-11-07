import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from 'express';
import { UserServiceService } from '../../Services/UserService/user-service.service';

export const loginGuardGuard: CanActivateFn = () => {
  const router=inject(Router)
  const usuarioService=inject(UserServiceService)

  return true
};
