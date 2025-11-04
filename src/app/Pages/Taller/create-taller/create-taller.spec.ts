import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaller } from './create-taller';

describe('CreateTaller', () => {
  let component: CreateTaller;
  let fixture: ComponentFixture<CreateTaller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
