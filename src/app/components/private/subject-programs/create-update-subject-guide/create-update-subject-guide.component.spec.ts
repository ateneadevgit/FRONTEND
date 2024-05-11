import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSubjectGuideComponent } from './create-update-subject-guide.component';

describe('CreateUpdateSubjectGuideComponent', () => {
  let component: CreateUpdateSubjectGuideComponent;
  let fixture: ComponentFixture<CreateUpdateSubjectGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUpdateSubjectGuideComponent],
    });
    fixture = TestBed.createComponent(CreateUpdateSubjectGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
