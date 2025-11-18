import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEncargadoComponent } from './modal-encargado.component';

describe('ModalEncargadoComponent', () => {
  let component: ModalEncargadoComponent;
  let fixture: ComponentFixture<ModalEncargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEncargadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
