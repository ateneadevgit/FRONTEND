import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestreCurriculumComponent } from './semestre-curriculum.component';

describe('SemestreCurriculumComponent', () => {
  let component: SemestreCurriculumComponent;
  let fixture: ComponentFixture<SemestreCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SemestreCurriculumComponent],
    });
    fixture = TestBed.createComponent(SemestreCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
