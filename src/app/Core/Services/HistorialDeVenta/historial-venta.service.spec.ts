import { TestBed } from '@angular/core/testing';

import { HistorialDeVentaService } from './historial-venta.service';

describe('HistorialDeVentaService', () => {
  let service: HistorialDeVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialDeVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
