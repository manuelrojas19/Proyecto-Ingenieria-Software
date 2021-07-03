import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureDataTableComponent } from './facture-data-table.component';

describe('FactureDataTableComponent', () => {
  let component: FactureDataTableComponent;
  let fixture: ComponentFixture<FactureDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureDataTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
