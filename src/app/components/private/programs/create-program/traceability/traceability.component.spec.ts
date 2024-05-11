import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceabilityComponent } from './traceability.component';

describe('TraceabilityComponent', () => {
  let component: TraceabilityComponent;
  let fixture: ComponentFixture<TraceabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraceabilityComponent],
    });
    fixture = TestBed.createComponent(TraceabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
