import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsComponent } from './flows.component';

describe('FlowsComponent', () => {
  let component: FlowsComponent;
  let fixture: ComponentFixture<FlowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowsComponent],
    });
    fixture = TestBed.createComponent(FlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
