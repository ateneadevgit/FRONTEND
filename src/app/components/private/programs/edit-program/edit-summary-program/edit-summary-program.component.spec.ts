import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSummaryProgramComponent } from './edit-summary-program.component';

describe('EditSummaryProgramComponent', () => {
  let component: EditSummaryProgramComponent;
  let fixture: ComponentFixture<EditSummaryProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSummaryProgramComponent],
    });
    fixture = TestBed.createComponent(EditSummaryProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
