import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsCurrentComponent } from './programs-current.component';

describe('ProgramsCurrentComponent', () => {
  let component: ProgramsCurrentComponent;
  let fixture: ComponentFixture<ProgramsCurrentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsCurrentComponent],
    });
    fixture = TestBed.createComponent(ProgramsCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
