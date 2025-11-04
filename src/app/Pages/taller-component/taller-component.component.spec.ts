import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TallerComponentComponent } from './taller-component.component';

describe('TallerComponentComponent', () => {
  let component: TallerComponentComponent;
  let fixture: ComponentFixture<TallerComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TallerComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TallerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
