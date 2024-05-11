import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcoreComponent } from './create-subcore.component';

describe('CreateSubcoreComponent', () => {
  let component: CreateSubcoreComponent;
  let fixture: ComponentFixture<CreateSubcoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubcoreComponent],
    });
    fixture = TestBed.createComponent(CreateSubcoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
