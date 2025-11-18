import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModificarClienteComponent } from './modal-modificar-cliente.component';

describe('ModalModificarClienteComponent', () => {
  let component: ModalModificarClienteComponent;
  let fixture: ComponentFixture<ModalModificarClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalModificarClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalModificarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
