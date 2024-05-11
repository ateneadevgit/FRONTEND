import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsActiveComponent } from './programs-active.component';

describe('ProgramsActiveComponent', () => {
  let component: ProgramsActiveComponent;
  let fixture: ComponentFixture<ProgramsActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsActiveComponent],
    });
    fixture = TestBed.createComponent(ProgramsActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
