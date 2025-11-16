import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { tallerGuardGuard } from './taller-guard.guard';

describe('tallerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => tallerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
