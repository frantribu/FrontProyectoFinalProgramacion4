import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaller } from './list-taller';

describe('ListTaller', () => {
  let component: ListTaller;
  let fixture: ComponentFixture<ListTaller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTaller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTaller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
