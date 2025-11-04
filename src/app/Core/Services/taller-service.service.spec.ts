import { TestBed } from '@angular/core/testing';

import { TallerServiceService } from './taller-service.service';

describe('TallerServiceService', () => {
  let service: TallerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
