import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommittesComponent } from './committes.component';

describe('CommittesComponent', () => {
  let component: CommittesComponent;
  let fixture: ComponentFixture<CommittesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommittesComponent],
    });
    fixture = TestBed.createComponent(CommittesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
