import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionProgramsComponent } from './construction-programs.component';

describe('ConstructionProgramsComponent', () => {
  let component: ConstructionProgramsComponent;
  let fixture: ComponentFixture<ConstructionProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionProgramsComponent],
    });
    fixture = TestBed.createComponent(ConstructionProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
