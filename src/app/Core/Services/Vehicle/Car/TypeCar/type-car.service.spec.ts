import { TestBed } from '@angular/core/testing';

import { TypeCarService } from './type-car.service';

describe('TypeCarServiceService', () => {
  let service: TypeCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
