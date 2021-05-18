import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesHomeComponent } from './employees-home.component';

describe('EmployeesHomeComponent', () => {
  let component: EmployeesHomeComponent;
  let fixture: ComponentFixture<EmployeesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
