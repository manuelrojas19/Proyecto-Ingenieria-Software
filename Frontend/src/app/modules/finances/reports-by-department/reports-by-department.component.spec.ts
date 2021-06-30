import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsByDepartmentComponent } from './reports-by-department.component';

describe('ReportsByDepartmentComponent', () => {
  let component: ReportsByDepartmentComponent;
  let fixture: ComponentFixture<ReportsByDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsByDepartmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsByDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
