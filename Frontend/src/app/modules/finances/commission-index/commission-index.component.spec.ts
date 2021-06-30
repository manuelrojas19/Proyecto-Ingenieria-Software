import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionIndexComponent } from './commission-index.component';

describe('CommissionIndexComponent', () => {
  let component: CommissionIndexComponent;
  let fixture: ComponentFixture<CommissionIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
