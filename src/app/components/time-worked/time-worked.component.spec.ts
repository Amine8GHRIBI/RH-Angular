import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeWorkedComponent } from './time-worked.component';

describe('TimeWorkedComponent', () => {
  let component: TimeWorkedComponent;
  let fixture: ComponentFixture<TimeWorkedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeWorkedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
