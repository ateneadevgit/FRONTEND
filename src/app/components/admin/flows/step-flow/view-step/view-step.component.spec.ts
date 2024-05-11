import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStepComponent } from './view-step.component';

describe('ViewStepComponent', () => {
  let component: ViewStepComponent;
  let fixture: ComponentFixture<ViewStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStepComponent],
    });
    fixture = TestBed.createComponent(ViewStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
