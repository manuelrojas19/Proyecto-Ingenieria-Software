import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturesIndexComponent } from './factures-index.component';

describe('FacturesIndexComponent', () => {
  let component: FacturesIndexComponent;
  let fixture: ComponentFixture<FacturesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturesIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
