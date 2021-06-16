import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsByEmployeeComponent } from './reports-by-employee.component';

describe('ReportsByEmployeeComponent', () => {
  let component: ReportsByEmployeeComponent;
  let fixture: ComponentFixture<ReportsByEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsByEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
