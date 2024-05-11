import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedProgramsComponent } from './declined-programs.component';

describe('DeclinedProgramsComponent', () => {
  let component: DeclinedProgramsComponent;
  let fixture: ComponentFixture<DeclinedProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeclinedProgramsComponent],
    });
    fixture = TestBed.createComponent(DeclinedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
