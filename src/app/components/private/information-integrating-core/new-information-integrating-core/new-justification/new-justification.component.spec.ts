import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJustificationComponent } from './new-justification.component';

describe('NewJustificationComponent', () => {
  let component: NewJustificationComponent;
  let fixture: ComponentFixture<NewJustificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewJustificationComponent],
    });
    fixture = TestBed.createComponent(NewJustificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
