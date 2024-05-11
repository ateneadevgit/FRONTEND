import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubcoreComponent } from './new-subcore.component';

describe('NewSubcoreComponent', () => {
  let component: NewSubcoreComponent;
  let fixture: ComponentFixture<NewSubcoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSubcoreComponent],
    });
    fixture = TestBed.createComponent(NewSubcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
