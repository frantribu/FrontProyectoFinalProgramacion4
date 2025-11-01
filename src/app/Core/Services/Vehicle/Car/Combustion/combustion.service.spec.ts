import { TestBed } from '@angular/core/testing';

import { CombustionService } from './combustion.service';

describe('CombustionService', () => {
  let service: CombustionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombustionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
