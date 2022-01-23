import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffEmployeesComponent } from './aff-employees.component';

describe('AffEmployeesComponent', () => {
  let component: AffEmployeesComponent;
  let fixture: ComponentFixture<AffEmployeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffEmployeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
