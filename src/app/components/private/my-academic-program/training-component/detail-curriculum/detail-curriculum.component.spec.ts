import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCurriculumComponent } from './detail-curriculum.component';

describe('DetailCurriculumComponent', () => {
  let component: DetailCurriculumComponent;
  let fixture: ComponentFixture<DetailCurriculumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailCurriculumComponent],
    });
    fixture = TestBed.createComponent(DetailCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
