import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsIndexComponent } from './commissions-index.component';

describe('CommissionsIndexComponent', () => {
  let component: CommissionsIndexComponent;
  let fixture: ComponentFixture<CommissionsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionsIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
