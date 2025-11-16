import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateVentaComponent } from './ventas.component';


describe('VentasComponent', () => {
  let component: CreateVentaComponent;
  let fixture: ComponentFixture<CreateVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
