import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompetenciesComponent } from './new-competencies.component';

describe('NewCompetenciesComponent', () => {
  let component: NewCompetenciesComponent;
  let fixture: ComponentFixture<NewCompetenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCompetenciesComponent],
    });
    fixture = TestBed.createComponent(NewCompetenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
