import { TestBed } from '@angular/core/testing';

import { AltaDeVentaService } from './alta-de-venta.service';

describe('AltaDeVentaService', () => {
  let service: AltaDeVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltaDeVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
