import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFlowComponent } from './step-flow.component';

describe('StepFlowComponent', () => {
  let component: StepFlowComponent;
  let fixture: ComponentFixture<StepFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StepFlowComponent],
    });
    fixture = TestBed.createComponent(StepFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
