import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVehiculoComponent } from './card-vehiculo.component';

describe('CardVehiculoComponent', () => {
  let component: CardVehiculoComponent;
  let fixture: ComponentFixture<CardVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
