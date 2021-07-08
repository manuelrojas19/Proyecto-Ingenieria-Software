import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureIndexComponent } from './facture-index.component';

describe('FactureIndexComponent', () => {
  let component: FactureIndexComponent;
  let fixture: ComponentFixture<FactureIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
