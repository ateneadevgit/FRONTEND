import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCampusComponent } from './approve-campus.component';

describe('ApproveCampusComponent', () => {
  let component: ApproveCampusComponent;
  let fixture: ComponentFixture<ApproveCampusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveCampusComponent],
    });
    fixture = TestBed.createComponent(ApproveCampusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
