import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemBanckComponent } from './problem-banck.component';

describe('ProblemBanckComponent', () => {
  let component: ProblemBanckComponent;
  let fixture: ComponentFixture<ProblemBanckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProblemBanckComponent],
    });
    fixture = TestBed.createComponent(ProblemBanckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
