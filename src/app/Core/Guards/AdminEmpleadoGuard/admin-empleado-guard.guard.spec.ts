import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminEmpleadoGuardGuard } from './admin-empleado-guard.guard';

describe('adminEmpleadoGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminEmpleadoGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
