import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcademicCreditsComponent } from './edit-academic-credits.component';

describe('EditAcademicCreditsComponent', () => {
  let component: EditAcademicCreditsComponent;
  let fixture: ComponentFixture<EditAcademicCreditsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAcademicCreditsComponent],
    });
    fixture = TestBed.createComponent(EditAcademicCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
