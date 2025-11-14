import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTaller } from './modificar-taller';

describe('ModificarTaller', () => {
  let component: ModificarTaller;
  let fixture: ComponentFixture<ModificarTaller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarTaller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarTaller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
