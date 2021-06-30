import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionInfoComponent } from './commission-info.component';

describe('CommissionInfoComponent', () => {
  let component: CommissionInfoComponent;
  let fixture: ComponentFixture<CommissionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
