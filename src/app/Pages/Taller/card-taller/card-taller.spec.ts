import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTaller } from './card-taller';

describe('CardTaller', () => {
  let component: CardTaller;
  let fixture: ComponentFixture<CardTaller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTaller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTaller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
