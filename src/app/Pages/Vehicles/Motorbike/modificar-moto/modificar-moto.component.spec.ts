import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMotoComponent } from './modificar-moto.component';

describe('ModificarMotoComponent', () => {
  let component: ModificarMotoComponent;
  let fixture: ComponentFixture<ModificarMotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarMotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
