import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivatedProgramsComponent } from './desactivated-programs.component';

describe('DesactivatedProgramsComponent', () => {
  let component: DesactivatedProgramsComponent;
  let fixture: ComponentFixture<DesactivatedProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesactivatedProgramsComponent],
    });
    fixture = TestBed.createComponent(DesactivatedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
