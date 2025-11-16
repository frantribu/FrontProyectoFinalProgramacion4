import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAutoComponent } from './modificar-auto.component';

describe('ModificarAutoComponent', () => {
  let component: ModificarAutoComponent;
  let fixture: ComponentFixture<ModificarAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarAutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
