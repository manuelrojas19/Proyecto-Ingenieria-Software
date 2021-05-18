import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesHomeComponent } from './finances-home.component';

describe('FinancesHomeComponent', () => {
  let component: FinancesHomeComponent;
  let fixture: ComponentFixture<FinancesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancesHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
