import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubcoreComponent } from './view-subcore.component';

describe('ViewSubcoreComponent', () => {
  let component: ViewSubcoreComponent;
  let fixture: ComponentFixture<ViewSubcoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubcoreComponent],
    });
    fixture = TestBed.createComponent(ViewSubcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
