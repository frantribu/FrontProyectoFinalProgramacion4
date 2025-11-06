import { TestBed } from '@angular/core/testing';

import { TypeMotorbikeService } from './type-motorbike.service';

describe('TypeMotorbikeService', () => {
  let service: TypeMotorbikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeMotorbikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
