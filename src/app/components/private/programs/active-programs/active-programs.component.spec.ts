import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProgramsComponent } from './active-programs.component';

describe('ActiveProgramsComponent', () => {
  let component: ActiveProgramsComponent;
  let fixture: ComponentFixture<ActiveProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveProgramsComponent],
    });
    fixture = TestBed.createComponent(ActiveProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
