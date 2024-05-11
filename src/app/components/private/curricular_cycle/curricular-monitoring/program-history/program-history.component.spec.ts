import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramHistoryComponent } from './program-history.component';

describe('ProgramHistoryComponent', () => {
  let component: ProgramHistoryComponent;
  let fixture: ComponentFixture<ProgramHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramHistoryComponent],
    });
    fixture = TestBed.createComponent(ProgramHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
