import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistorialDeVentasComponent } from './list-historial-de-ventas.component';

describe('ListHistorialDeVentasComponent', () => {
  let component: ListHistorialDeVentasComponent;
  let fixture: ComponentFixture<ListHistorialDeVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListHistorialDeVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHistorialDeVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
