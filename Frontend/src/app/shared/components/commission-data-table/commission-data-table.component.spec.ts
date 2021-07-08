import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionDataTableComponent } from './commission-data-table.component';

describe('CommissionDataTableComponent', () => {
  let component: CommissionDataTableComponent;
  let fixture: ComponentFixture<CommissionDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
